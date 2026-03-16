// ==========================================
// CHAT AJAX LP - Centralized Design Tokens
// Ajax Hub Visual Identity
// Dual-State Architectural Minimalism
// ==========================================

export const tokens = {
  colors: {
    purple: '#5E17EB',
    purpleMid: '#7B3FFF',
    black: '#131313',
    white: '#FAFAFA',
    depth: '#1A1A1A',
    surface: '#F0F0F0',
  },
  shadows: {
    hardSm: '4px 4px 0px #131313',
    hard: '8px 8px 0px #131313',
    hardPurpleSm: '4px 4px 0px #5E17EB',
    hardPurple: '8px 8px 0px #5E17EB',
    hardWhiteSm: '4px 4px 0px #FAFAFA',
    hardWhite: '8px 8px 0px #FAFAFA',
    insetPurple: 'inset 0 0 0 2px #5E17EB',
  },
  geometric: {
    PARALLELOGRAM_ANGLE: 18,
    CLIP_PATH_PARALLELOGRAM: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
    CLIP_PATH_BADGE: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
    CLIP_PATH_CORNER_TRIANGLE: 'polygon(0 0, 100% 0, 100% 100%)',
    GRID_SIZE: 60,
    HARD_SHADOW_OFFSET: 4,
    ACCENT_ANGLE: 45,
  },
  durations: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
    pageTransition: 0.8,
  },
  easings: {
    snappy: [0.76, 0, 0.24, 1] as const,
    smooth: [0.4, 0, 0.2, 1] as const,
    bounce: [0.34, 1.56, 0.64, 1] as const,
  },
} as const
