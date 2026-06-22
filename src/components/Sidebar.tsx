import { useState, useEffect } from 'react'
import brand from '../brand.config'

interface Props {
  currentPage: string
  onNavigate: (id: string) => void
  isOpen: boolean
  onClose: () => void
  onPrint?: () => void
}

function findActiveGroup(page: string): string | null {
  for (const group of brand.nav) {
    for (const item of group.items) {
      if (item.id === page) return group.group
      if (item.children?.some(c => c.id === page)) return group.group
    }
  }
  return null
}

function initialCollapsed(page: string): Set<string> {
  if (typeof window === 'undefined' || window.innerWidth > 768) return new Set()
  const active = findActiveGroup(page)
  return new Set(brand.nav.map(g => g.group).filter(g => g !== active))
}

function findParentItem(page: string) {
  for (const group of brand.nav) {
    for (const item of group.items) {
      if (item.children?.some(c => c.id === page)) return item.label
    }
  }
  return null
}

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose, onPrint }: Props) {
  const [collapsed, setCollapsed] = useState<Set<string>>(() => initialCollapsed(currentPage))
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const parent = findParentItem(currentPage)
    return parent ? new Set([parent]) : new Set()
  })
  const [logoError, setLogoError] = useState(false)
  const hasLogo = !!brand.meta.sidebarLogoImage

  useEffect(() => {
    if (window.innerWidth <= 768) {
      const active = findActiveGroup(currentPage)
      setCollapsed(new Set(brand.nav.map(g => g.group).filter(g => g !== active)))
    }
    const parent = findParentItem(currentPage)
    if (parent) setExpandedItems(prev => { const n = new Set(prev); n.add(parent); return n })
  }, [currentPage])

  useEffect(() => {
    if (isOpen && window.innerWidth <= 768) {
      const active = findActiveGroup(currentPage)
      setCollapsed(new Set(brand.nav.map(g => g.group).filter(g => g !== active)))
    }
  }, [isOpen])

  const toggle = (g: string) => setCollapsed(prev => {
    const n = new Set(prev)
    n.has(g) ? n.delete(g) : n.add(g)
    return n
  })

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo-wrap" onClick={() => { onNavigate('home'); onClose() }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          {hasLogo && (
            <img
              src={brand.meta.sidebarLogoImage}
              alt={brand.meta.client}
              style={{ height: 30, width: 'auto', display: 'block' }}
              onError={() => { setLogoError(true) }}
            />
          )}
          {(!hasLogo || logoError) && (
            <div style={{ fontFamily: "'Saans', sans-serif", fontWeight: 600, fontSize: 15,
              letterSpacing: '-0.02em', color: '#111', lineHeight: 1 }}>
              {brand.meta.nameLine1}{brand.meta.nameLine2 ? ' ' + brand.meta.nameLine2 : ''}
            </div>
          )}
        </div>
        <button className="sidebar-close" onClick={e => { e.stopPropagation(); onClose() }} aria-label="Close menu">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <nav className="nav-groups" style={{ flex: 1 }}>
        {brand.nav.map(group => {
          const isCollapsed = collapsed.has(group.group)
          return (
            <div key={group.group}>
              <div className="nav-group-label nav-group-toggle" onClick={() => toggle(group.group)}>
                <span>{group.group}</span>
                <svg className={`nav-group-chevron ${isCollapsed ? 'collapsed' : ''}`}
                  width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {!isCollapsed && group.items.map(item => {
                if (item.children) {
                  const isExpanded = expandedItems.has(item.label)
                  const hasActiveChild = item.children.some(c => c.id === currentPage)
                  const expandItem = () => {
                    setExpandedItems(prev => { const n = new Set(prev); n.add(item.label); return n })
                    onNavigate(item.id)
                    onClose()
                  }
                  return (
                    <div key={item.id}>
                      <span
                        className={`nav-link nav-parent-item ${hasActiveChild ? 'active' : ''}`}
                        onClick={expandItem}
                      >
                        <span>{item.label}</span>
                        <svg className={`nav-item-chevron ${isExpanded ? 'open' : ''}`}
                          width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {isExpanded && item.children.map(child => (
                        <span
                          key={child.id}
                          className={`nav-link nav-child ${currentPage === child.id ? 'active' : ''}`}
                          onClick={() => { onNavigate(child.id); onClose() }}
                        >{child.label}</span>
                      ))}
                    </div>
                  )
                }
                return (
                  <span
                    key={item.id}
                    className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                    onClick={() => { onNavigate(item.id); onClose() }}
                  >{item.label}</span>
                )
              })}
            </div>
          )
        })}
      </nav>

      <div className="sidebar-print-footer">
        <button className="sidebar-print-btn" onClick={() => onPrint ? onPrint() : window.print()}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Generate print version
        </button>
      </div>
    </aside>
  )
}
