'use client'

import { useMemo, useState } from 'react'
import type { DashboardMember } from '@/data/dashboardFamilyMock'
import { dashboardFamilyRoot } from '@/data/dashboardFamilyMock'
import styles from './DashboardTree.module.css'

type DashboardTreeProps = {
  searchQuery: string
}

type TreeNodeProps = {
  member: DashboardMember
  searchTerm: string
  collapsedIds: Set<string>
  onToggle: (memberId: string) => void
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function branchMatchesSearch(member: DashboardMember, searchTerm: string): boolean {
  if (!searchTerm) {
    return true
  }

  const memberText = `${member.name} ${member.relationship} ${member.location} ${member.occupation}`
    .toLowerCase()
    .trim()

  if (memberText.includes(searchTerm)) {
    return true
  }

  return (member.children ?? []).some((child) => branchMatchesSearch(child, searchTerm))
}

function countVisibleMembers(member: DashboardMember, searchTerm: string): number {
  if (!branchMatchesSearch(member, searchTerm)) {
    return 0
  }

  return 1 + (member.children ?? []).reduce((sum, child) => sum + countVisibleMembers(child, searchTerm), 0)
}

function TreeNode({ member, searchTerm, collapsedIds, onToggle }: TreeNodeProps) {
  const children = member.children ?? []
  const hasChildren = children.length > 0
  const isCollapsed = collapsedIds.has(member.id)
  const shouldRender = branchMatchesSearch(member, searchTerm)

  if (!shouldRender) {
    return null
  }

  const shownChildren = children.filter((child) => branchMatchesSearch(child, searchTerm))

  return (
    <li className={styles.nodeItem}>
      <article className={styles.nodeCard}>
        <div className={styles.cardTopRow}>
          <div className={styles.avatar}>{getInitials(member.name)}</div>
          <div className={styles.identityBlock}>
            <h3 className={styles.memberName}>{member.name}</h3>
            <p className={styles.memberRole}>{member.relationship}</p>
          </div>
          {hasChildren ? (
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => onToggle(member.id)}
              aria-label={isCollapsed ? `Expand descendants of ${member.name}` : `Collapse descendants of ${member.name}`}
            >
              {isCollapsed ? '+' : '-'}
            </button>
          ) : null}
        </div>

        <dl className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <dt>Born</dt>
            <dd>{member.birthYear}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt>Location</dt>
            <dd>{member.location}</dd>
          </div>
          <div className={styles.metaItemWide}>
            <dt>Profession</dt>
            <dd>{member.occupation}</dd>
          </div>
        </dl>

        {member.partnerName ? <p className={styles.partnerTag}>Partner: {member.partnerName}</p> : null}
      </article>

      {hasChildren && !isCollapsed && shownChildren.length > 0 ? (
        <ul className={styles.childrenList}>
          {shownChildren.map((child) => (
            <TreeNode
              key={child.id}
              member={child}
              searchTerm={searchTerm}
              collapsedIds={collapsedIds}
              onToggle={onToggle}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export default function DashboardTree({ searchQuery }: DashboardTreeProps) {
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set())
  const normalizedQuery = searchQuery.toLowerCase().trim()

  const visibleCount = useMemo(
    () => countVisibleMembers(dashboardFamilyRoot, normalizedQuery),
    [normalizedQuery],
  )

  const hasResults = visibleCount > 0

  function handleToggle(memberId: string): void {
    setCollapsedIds((currentIds) => {
      const nextIds = new Set(currentIds)
      if (nextIds.has(memberId)) {
        nextIds.delete(memberId)
      } else {
        nextIds.add(memberId)
      }
      return nextIds
    })
  }

  return (
    <section className={styles.treeSection} aria-label="Family hierarchy dashboard">
      <div className={styles.treeHeader}>
        <p className={styles.treeEyebrow}>Classic Family Hierarchy</p>
        <h2 className={styles.treeTitle}>Rivera Legacy Tree</h2>
        <p className={styles.treeDescription}>
          Explore parent branches flowing into children and grandchildren. The structure is designed for
          easy future integration with real user-generated family records.
        </p>
        <p className={styles.treeCounter}>{visibleCount} members visible</p>
      </div>

      {hasResults ? (
        <div className={styles.treeCanvas}>
          <ul className={styles.rootList}>
            <TreeNode
              member={dashboardFamilyRoot}
              searchTerm={normalizedQuery}
              collapsedIds={collapsedIds}
              onToggle={handleToggle}
            />
          </ul>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>No members matched this search</h3>
          <p>Try another name, role, city, or profession.</p>
        </div>
      )}
    </section>
  )
}
