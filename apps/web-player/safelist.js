export default [
  // MARK: Layout
  {
    pattern: /aspect-./
  },

  /* Container */
  'container',
  'mx-auto',
  'max-width',
  'min-width',

  /* Columns */
  {
    pattern: /columns-./
  },

  /* Break After */
  /* Break Before */
  /* Break Inside */

  {
    pattern: /break-./
  },

  /* Box Decoration Break */

  /* Box Sizing */
  {
    pattern: /box-./
  },

  /* Display */
  'block',
  'inline-block',
  'inline',
  'flex',
  'inline-flex',
  'table',
  'inline-table',
  'table-caption',
  'table-cell',
  'table-column',
  'table-column-group',
  'table-footer-group',
  'table-header-group',
  'table-row-group',
  'table-row',
  'flow-root',
  'grid',
  'inline-grid',
  'contents',
  'list-item',
  'hidden',

  /* Floats */
  'float-right',
  'float-left',
  'float-none',

  /* Clear */
  'clear-left',
  'clear-right',
  'clear-both',
  'clear-none',

  /* Isolation */
  'isolate',
  'isolation-auto',

  /* Object Fit */
  /* Object Position */
  {
    pattern: /object-./
  },

  /* Overflow */
  /* Overscroll Behavior */
  {
    pattern: /overflow-./
  },

  /* Position */
  'static',
  'fixed',
  'absolute',
  'relative',
  'sticky',

  /* Top / Right / Bottom / Left */
  {
    pattern: /(inset|top|right|bottom|left|start|end)-./
  },

  /* Visibility */
  'visible',
  'invisible',
  'collapse',

  /* Z-Index */
  {
    pattern: /z-./
  },

  // MARK: Flexbox & Grid

  /* Flex Basis */
  {
    pattern: /basis-./
  },

  /* Flex Direction */
  /* Flex Wrap */
  /* Flex */
  /* Flex Grow */
  /* Flex Shrink */
  /* Order */
  {
    pattern: /(flex|grow|shrink|order)-./
  },

  /* Grid Template Columns */
  /* Grid Column Start / End */
  /* Grid Template Rows */
  /* Grid Row Start / End */
  /* Grid Auto Flow */
  /* Grid Auto Columns */
  /* Grid Auto Rows */
  /* Gap */
  {pattern: /(grid|col|row|auto|gap)-./},

  /* Justify Content */
  /* Justify Items */
  /* Justify Self */
  {pattern: /justify-./},

  /* Align Content */
  {pattern: /content-./},

  /* Align Items */
  {pattern: /items-./},

  /* Align Self */
  {pattern: /self-./},

  /* Place Content */
  /* Place Items */
  /* Place Self */
  {pattern: /place-./},

  // MARK: Spacing

  /* Padding */
  {pattern: /(p|m)-./},

  /* Space Between */
  {pattern: /space-./},

  // MARK: Sizing

  /* Width */
  /* Min-Width */
  /* Max-Width */
  /* Height */
  /* Min-Height */
  /* Max-Height */
  {pattern: /(w|min-w|max-w|h|min-h|max-h)-./},

  // MARK: Typography

  /* Font Family */
  {pattern: /font-./},

  /* Font Size */
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
  'text-6xl',
  'text-7xl',
  'text-8xl',
  'text-9xl',

  /* Font Smoothing */
  'antialiased',
  'subpixel-antialiased',

  /* Font Style */
  'italic',
  'not-italic',

  /* Font Variant Numeric */
  'normal-nums',
  'ordinal',
  'slashed-zero',
  'lining-nums',
  'oldstyle-nums',
  'proportional-nums',
  'tabular-nums',
  'diagonal-fractions',
  'stacked-fractions',

  /* Letter Spacing */
  {pattern: /tracking-./},

  /* Line Clamp */
  {pattern: /line-./},

  /* Line Height */
  {pattern: /leading-./},

  /* List Style Image */
  /* List Style Position */
  /* List Style Type */
  {pattern: /list-./},

  /* Text Align */
  'text-left',
  'text-center',
  'text-right',
  'text-justify',
  'text-start',
  'text-end',

  /* Text Color */
  'text-inherit',
  'text-current',
  'text-transparent',

  /* Text Decoration */
  'underline',
  'overline',
  'line-through',
  'no-underline',

  /* Text Decoration Color */
  'decoration-inherit',
  'decoration-current',
  'decoration-transparent',

  /* Text Decoration Style */
  'decoration-solid',
  'decoration-double',
  'decoration-dotted',
  'decoration-dashed',
  'decoration-wavy',

  /* Text Decoration Thickness */
  {pattern: /decoration-./},

  /* Text Underline Offset */
  {pattern: /underline-./},

  /* Text Transform */
  'uppercase',
  'lowercase',
  'capitalize',
  'normal-case',

  /* Text Overflow */
  'truncate',
  'text-ellipsis',
  'text-clip',

  /* Text Indent */
  {pattern: /indent-./},

  /* Vertical Align */
  {pattern: /align-./},

  /* Whitespace */
  {pattern: /whitespace-./},

  /* Word Break */
  {pattern: /break-./},

  /* Hyphens */
  'hyphens-none',
  'hyphens-manual',
  'hyphens-auto',

  /* Content */
  'content-none',

  // MARK: Backgrounds

  /* Background Attachment */
  'bg-fixed',
  'bg-local',
  'bg-scroll',

  /* Background Clip */
  'bg-clip-border',
  'bg-clip-padding',
  'bg-clip-content',
  'bg-clip-text',

  /* Background Color */
  'bg-inherit',
  'bg-current',
  'bg-transparent',

  /* Background Origin */
  'bg-origin-border',
  'bg-origin-padding',
  'bg-origin-content',

  /* Background Position */
  'bg-bottom',
  'bg-center',
  'bg-left',
  'bg-left-bottom',
  'bg-left-top',
  'bg-right',
  'bg-right-bottom',
  'bg-right-top',
  'bg-top',

  /* Background Repeat */
  'bg-repeat',
  'bg-no-repeat',
  'bg-repeat-x',
  'bg-repeat-y',
  'bg-repeat-round',
  'bg-repeat-space',

  /* Background Size */
  'bg-auto',
  'bg-cover',
  'bg-contain',

  /* Background Image */
  'bg-none',
  'bg-gradient-to-t',
  'bg-gradient-to-tr',
  'bg-gradient-to-r',
  'bg-gradient-to-br',
  'bg-gradient-to-b',
  'bg-gradient-to-bl',
  'bg-gradient-to-l',
  'bg-gradient-to-tl',

  /* Gradient Color Stops */
  'from-inherit',
  'from-current',
  'from-transparent',
  'from-black',

  // MARK: Borders

  /* Border Radius */
  { pattern: /rounded-./},

  /* Border Width */
  'border-0',
  'border-2',
  'border-4',
  'border-8',
  'border',
  'border-x-0',
  'border-x-2',
  'border-x-4',
  'border-x-8',
  'border-x',
  'border-y-0',
  'border-y-2',
  'border-y-4',
  'border-y-8',
  'border-y',
  'border-s-0',
  'border-s-2',
  'border-s-4',
  'border-s-8',
  'border-s',
  'border-e-0',
  'border-e-2',
  'border-e-4',
  'border-e-8',
  'border-e',
  'border-t-0',
  'border-t-2',
  'border-t-4',
  'border-t-8',
  'border-t',
  'border-r-0',
  'border-r-2',
  'border-r-4',
  'border-r-8',
  'border-r',
  'border-b-0',
  'border-b-2',
  'border-b-4',
  'border-b-8',
  'border-b',
  'border-l-0',
  'border-l-2',
  'border-l-4',
  'border-l-8',
  'border-l',

  /* Border Color */
  'border-inherit',
  'border-current',
  'border-transparent',

  'border-s-inherit',
  'border-s-current',
  'border-s-transparent',

  'border-e-inherit',
  'border-e-current',
  'border-e-transparent',

  'border-t-inherit',
  'border-t-current',
  'border-t-transparent',

  'border-r-inherit',
  'border-r-current',
  'border-r-transparent',


  'border-l-inherit',
  'border-l-current',
  'border-l-transparent',

  /* Border Style */
  'border-solid',
  'border-dashed',
  'border-dotted',
  'border-double',
  'border-hidden',
  'border-none',

  /* Divide Width */
  'divide-x-0',
  'divide-x-2',
  'divide-x-4',
  'divide-x-8',
  'divide-x',
  'divide-x-reverse',
  'divide-y-0',
  'divide-y-2',
  'divide-y-4',
  'divide-y-8',
  'divide-y',
  'divide-y-reverse',

  /* Divide Color */
  'divide-inherit',
  'divide-current',
  'divide-transparent',

  /* Divide Style */
  'divide-solid',
  'divide-dashed',
  'divide-dotted',
  'divide-double',
  'divide-none',

  /* Outline Width */
  'outline-0',
  'outline-1',
  'outline-2',
  'outline-4',
  'outline-8',

  /* Outline Color */
  'outline-inherit',
  'outline-current',
  'outline-transparent',

  /* Outline Style */
  'outline-none',
  'outline',
  'outline-dashed',
  'outline-dotted',
  'outline-double',

  /* Outline Offset */
  'outline-offset-0',
  'outline-offset-1',
  'outline-offset-2',
  'outline-offset-4',
  'outline-offset-8',

  /* Ring Width */
  'ring-0',
  'ring-1',
  'ring-2',
  'ring',
  'ring-4',
  'ring-8',
  'ring-inset',

  /* Ring Color */
  'ring-inherit',
  'ring-current',
  'ring-transparent',

  /* Ring Offset Width */
  'ring-offset-0',
  'ring-offset-1',
  'ring-offset-2',
  'ring-offset-4',
  'ring-offset-8',

  /* Ring Offset Color */
  'ring-offset-inherit',
  'ring-offset-current',
  'ring-offset-transparent',

  // MARK: Effects

  /* Box Shadow */
  'shadow-sm',
  'shadow',
  'shadow-md',
  'shadow-lg',
  'shadow-xl',
  'shadow-2xl',
  'shadow-inner',
  'shadow-none',

  /* Box Shadow Color */
  'shadow-inherit',
  'shadow-current',
  'shadow-transparent',

  /* Opacity */
  {pattern: /opacity-./},

  /* Mix Blend Mode */
  {pattern: /mix-./},

  /* Background Blend Mode */
  {pattern: /bg-blend-./},
  // MARK: Filters

  /* Blur */
  {pattern: /blur-./},

  /* Brightness */
  {pattern: /brightness-./},

  /* Contrast */
  {pattern: /contrast-./},

  /* Drop Shadow */
  {pattern: /drop-shadow-./},

  /* Grayscale */
  'grayscale-0',
  'grayscale',

  /* Hue Rotate */
  {pattern: /hue-rotate-./},

  /* Invert */
  'invert-0',
  'invert',

  /* Saturate */
  {pattern: /saturate-./},

  /* Sepia */
  'sepia-0',
  'sepia',

  /* Backdrop Blur */
  /* Backdrop Brightness */
  /* Backdrop Contrast */
  /* Backdrop Grayscale */
  /* Backdrop Hue Rotate */
  /* Backdrop Invert */
  /* Backdrop Opacity */
  /* Backdrop Saturate */
  /* Backdrop Sepia */
  {pattern: /backdrop-./},

  // MARK: Tables

  /* Border Collapse */
  'border-collapse',
  'border-separate',

  /* Border Spacing */
  {pattern: /border-spacing-./},

  /* Table Layout */
  'table-auto',
  'table-fixed',

  /* Caption Side */
  'caption-top',
  'caption-bottom',

  // MARK: Transitions & Animation

  /* Transition Property */
  {pattern: /transition-./},

  /* Transition Duration */
  {pattern: /duration-./},

  /* Transition Timing Function */
  {pattern: /ease-./},

  /* Transition Delay */
  {pattern: /delay-./},

  /* Animation */
  {pattern: /animate-./},

  // MARK: Transforms

  /* Scale */
  {pattern: /scale-./},

  /* Rotate */
  {pattern: /rotate-./},

  /* Translate */
  {pattern: /translate-./},

  /* Skew */
  {pattern: /skew-./},

  /* Transform Origin */
  {pattern: /origin-./},

  // MARK: Interactivity

  /* Accent Color */
  'accent-auto',
  'accent-inherit',
  'accent-current',
  'accent-transparent',

  /* Appearance */
  'appearance-none',

  /* Cursor */
  {pattern: /cursor-./},

  /* Caret Color */
  'caret-inherit',
  'caret-current',
  'caret-transparent',

  /* Pointer Events */
  'pointer-events-none',
  'pointer-events-auto',

  /* Resize */
  'resize-none',
  'resize-y',
  'resize-x',
  'resize',

  /* Scroll Behavior */
  /* Scroll Margin */
  /* Scroll Padding */
  {pattern: /scroll-./},

  /* Scroll Snap Align */
  'snap-start',
  'snap-end',
  'snap-center',
  'snap-align-none',

  /* Scroll Snap Stop */
  'snap-normal',
  'snap-always',

  /* Scroll Snap Type */
  'snap-none',
  'snap-x',
  'snap-y',
  'snap-both',
  'snap-mandatory',
  'snap-proximity',

  /* Touch Action */
  'touch-auto',
  'touch-none',
  'touch-pan-x',
  'touch-pan-left',
  'touch-pan-right',
  'touch-pan-y',
  'touch-pan-up',
  'touch-pan-down',
  'touch-pinch-zoom',
  'touch-manipulation',

  /* User Select */
  'select-none',
  'select-text',
  'select-all',
  'select-auto',

  /* Will Change */
  'will-change-auto',
  'will-change-scroll',
  'will-change-contents',
  'will-change-transform',

  // MARK: SVG

  /* Fill */
  'fill-none',
  'fill-inherit',
  'fill-current',
  'fill-transparent',


  /* Stroke */
  'stroke-none',
  'stroke-inherit',
  'stroke-current',
  'stroke-transparent',

  /* Stroke Width */
  'stroke-0',
  'stroke-1',
  'stroke-2',

  // MARK: Accessibility

  /* Screen Readers */
  'sr-only',
  'not-sr-only'
];
