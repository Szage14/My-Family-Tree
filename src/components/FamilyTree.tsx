'use client'

import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { familyMock } from '@/data/familyMock'
import { FamilyMember } from '@/types/family'

export default function FamilyTree() {
  // Convert family members into React Flow nodes
  const nodes: Node[] = familyMock.map((member: FamilyMember, index: number) => ({
    id: member.id,
    data: { label: member.name },
    position: { x: index * 200, y: 100 },
  }))

  // Empty edges for now
  const edges: Edge[] = []

  return (
    <div className="w-full" style={{ height: '600px' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
