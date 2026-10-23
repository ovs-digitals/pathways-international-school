import React from "react";
const SlotImpl = React.forwardRef(function Slot({ children, ...props }, ref) {
  if (!React.isValidElement(children)) return null;
  const cp = children.props || {};
  return React.cloneElement(children, { ...props, ...cp, className: [props.className, cp.className].filter(Boolean).join(" "), style: { ...(props.style || {}), ...(cp.style || {}) }, ref });
});
export const Slot = Object.assign(SlotImpl, { Root: SlotImpl, Slot: SlotImpl });
