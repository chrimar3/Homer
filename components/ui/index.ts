/**
 * Luxury UI Component Library for Homer Jewelry E-commerce
 * 
 * A comprehensive collection of premium React components with:
 * - Elegant gold accent theming
 * - Smooth animations and transitions
 * - Full TypeScript support
 * - Accessibility features
 * - Responsive design
 * - Tailwind CSS styling
 * 
 * Usage:
 * import { Button, Card, Input } from '@/components/ui';
 */

// Base Components
export { default as Button } from './Button';
export { default as IconButton } from './IconButton';

// Layout Components  
export { default as Card, CardHeader, CardBody, CardFooter } from './Card';
export { default as Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

// Form Components
export { default as Input } from './Input';
export { default as Textarea } from './Textarea';
export { default as Select } from './Select';
export { default as Checkbox } from './Checkbox';
export { default as Radio } from './Radio';

// Feedback Components
export { default as Alert } from './Alert';
export { default as Badge } from './Badge';
export { default as Loader, FullPageLoader } from './Loader';
export { default as Tooltip } from './Tooltip';

// Navigation Components
export { default as Tabs } from './Tabs';
export { default as Accordion } from './Accordion';

// Re-export types for convenience
export type {
  ButtonProps,
  IconButtonProps,
  CardProps,
  ModalProps,
  InputProps,
  TextareaProps,
  SelectProps,
  CheckboxProps,
  RadioProps,
  AlertProps,
  BadgeProps,
  LoaderProps,
  TooltipProps,
  TabsProps,
  AccordionProps,
  SizeVariant,
  ColorVariant,
  BaseComponentProps,
} from '../../types';