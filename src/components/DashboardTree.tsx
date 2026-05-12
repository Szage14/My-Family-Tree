'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
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


function getAvatarToneClass(avatarColor?: string): string {
  const toneMap: Record<string, string> = {
    'from-blue-600 to-blue-400': styles.avatarBlue,
    'from-rose-600 to-pink-400': styles.avatarRose,
    'from-purple-600 to-purple-400': styles.avatarPurple,
    'from-amber-600 to-amber-400': styles.avatarAmber,
    'from-emerald-600 to-emerald-400': styles.avatarEmerald,
    'from-cyan-600 to-blue-400': styles.avatarCyan,
    'from-yellow-500 to-yellow-300': styles.avatarYellow,
    'from-indigo-600 to-indigo-400': styles.avatarIndigo,
    'from-green-600 to-emerald-400': styles.avatarGreen,
    'from-teal-600 to-teal-400': styles.avatarTeal,
    'from-pink-600 to-rose-400': styles.avatarPink,
    'from-violet-600 to-purple-400': styles.avatarViolet,
    'from-orange-600 to-orange-400': styles.avatarOrange,
    'from-red-600 to-pink-400': styles.avatarRed,
    'from-fuchsia-500 to-purple-400': styles.avatarFuchsia,
    'from-lime-600 to-green-400': styles.avatarLime,
    'from-sky-600 to-cyan-400': styles.avatarSky,
    'from-slate-600 to-gray-400': styles.avatarSlate,
  }

  return toneMap[avatarColor || 'from-blue-600 to-blue-400'] || styles.avatarBlue
}
function formatBirthDate(birthDate: string): string {
  try {
    const date = new Date(birthDate)
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  } catch {
    return birthDate
  }
}

function branchMatchesSearch(member: DashboardMember, searchTerm: string): boolean {
  if (!searchTerm) {
    return true
  }

  const memberText = `${member.name} ${member.relationship} ${member.address}`
    .toLowerCase()
    .trim()

  if (memberText.includes(searchTerm)) {
    return true
  }

  // Check spouse
  if (member.spouse) {
    const spouseText = `${member.spouse.name} ${member.spouse.relationship} ${member.spouse.address}`.toLowerCase().trim()
    if (spouseText.includes(searchTerm)) {
      return true
    }
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
      <div className={styles.coupleContainer}>
        {/* Main member card */}
        <article className={styles.nodeCard}>
          <div className={styles.cardTopRow}>
            {member.avatarUrl ? (
              <Image src={member.avatarUrl} alt={member.name} width={40} height={40} className={styles.profileImage} />
            ) : (
              <div className={`${styles.avatar} ${getAvatarToneClass(member.avatarColor)}`}>
                {getInitials(member.name)}
              </div>
            )}
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
              <dt>Birthdate</dt>
              <dd>{formatBirthDate(member.birthDate)}</dd>
            </div>
            <div className={styles.metaItemWide}>
              <dt>Address</dt>
              <dd>{member.address}</dd>
            </div>
          </dl>
        </article>

        {/* Spouse card if present */}
        {member.spouse ? (
          <>
            <div className={styles.spouseConnector} />
            <article className={styles.nodeCard + ' ' + styles.spouseCard}>
              <div className={styles.cardTopRow}>
                {member.spouse.avatarUrl ? (
                  <Image src={member.spouse.avatarUrl} alt={member.spouse.name} width={40} height={40} className={styles.profileImage} />
                ) : (
                  <div className={`${styles.avatar} ${getAvatarToneClass(member.spouse.avatarColor)}`}>
                    {getInitials(member.spouse.name)}
                  </div>
                )}
                <div className={styles.identityBlock}>
                  <h3 className={styles.memberName}>{member.spouse.name}</h3>
                  <p className={styles.memberRole}>{member.spouse.relationship}</p>
                </div>
              </div>

              <dl className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <dt>Birthdate</dt>
                  <dd>{formatBirthDate(member.spouse.birthDate)}</dd>
                </div>
                <div className={styles.metaItemWide}>
                  <dt>Address</dt>
                  <dd>{member.spouse.address}</dd>
                </div>
              </dl>
            </article>
          </>
        ) : null}
      </div>

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
