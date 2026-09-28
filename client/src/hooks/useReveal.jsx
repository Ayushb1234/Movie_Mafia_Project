import { useEffect, useRef, useState } from "react";

/**
 * useReveal — lightweight scroll-reveal powered by IntersectionObserver.
 * Returns a ref to attach to any element and a boolean once it enters view.
 * Framer-Motion-style entrance without the dependency.
 */
export const useReveal = (options = {}) => {
  const { threshold = 0.15, once = true, rootMargin = "0px 0px -40px 0px" } =
    options;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return [ref, visible];
};

/**
 * Reveal — wrapper that fades/slides its children in on scroll.
 * Supports a stagger `delay` (ms) for grid entrances.
 */
export const Reveal = ({ children, delay = 0, as: Tag = "div", className = "", ...rest }) => {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default useReveal;
