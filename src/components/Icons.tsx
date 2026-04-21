// Shared SVG icon set — matches the design's lucide-ish style
import type { SVGProps } from "react";

const base = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IMail = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"/><path d="M3 7l9 6 9-6"/></svg>;
export const IDownload = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M12 3v13"/><path d="M7 11l5 5 5-5"/><path d="M5 21h14"/></svg>;
export const IArrowRight = (p: SVGProps<SVGSVGElement>) => <svg {...base} width={14} height={14} {...p}><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>;
export const IChevL = (p: SVGProps<SVGSVGElement>) => <svg {...base} strokeWidth={1.8} {...p}><path d="M15 18l-6-6 6-6"/></svg>;
export const IChevR = (p: SVGProps<SVGSVGElement>) => <svg {...base} strokeWidth={1.8} {...p}><path d="M9 6l6 6-6 6"/></svg>;
export const ILink = (p: SVGProps<SVGSVGElement>) => <svg {...base} width={14} height={14} {...p}><path d="M10 14a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1"/><path d="M14 10a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>;
export const IPin = (p: SVGProps<SVGSVGElement>) => <svg {...base} width={13} height={13} {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
export const ICap = (p: SVGProps<SVGSVGElement>) => <svg {...base} width={14} height={14} {...p}><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>;
export const IAward = (p: SVGProps<SVGSVGElement>) => <svg {...base} width={14} height={14} {...p}><circle cx="12" cy="9" r="6"/><path d="M8.2 13.5L7 22l5-3 5 3-1.2-8.5"/></svg>;
export const IBook = (p: SVGProps<SVGSVGElement>) => <svg {...base} width={14} height={14} {...p}><path d="M4 5a2 2 0 012-2h13v18H6a2 2 0 01-2-2V5z"/><path d="M4 19h15"/></svg>;
export const IGlobe = (p: SVGProps<SVGSVGElement>) => <svg {...base} width={14} height={14} {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>;
export const IMenu = (p: SVGProps<SVGSVGElement>) => <svg {...base} strokeWidth={1.8} width={18} height={18} {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
export const IX = (p: SVGProps<SVGSVGElement>) => <svg {...base} strokeWidth={1.8} width={18} height={18} {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
export const IDot = () => <span style={{display:"inline-block",width:3,height:3,borderRadius:3,background:"currentColor",opacity:.5,margin:"0 8px",verticalAlign:"middle"}}/>;

export const IScholar = (p: SVGProps<SVGSVGElement>) => <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9l-11-6zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>;
export const ILinkedin = (p: SVGProps<SVGSVGElement>) => <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11.01-4.13 2.06 2.06 0 01-.01 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>;
export const IGithub = (p: SVGProps<SVGSVGElement>) => <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.2-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.3 2.9.2 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3"/></svg>;
export const IOrcid = (p: SVGProps<SVGSVGElement>) => <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zM7.4 17.6H5.7V7.3h1.7v10.3zm-.8-11.6c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zM18.3 17.6h-3.5V7.3h3.4c3.3 0 4.8 2.3 4.8 5.1 0 3-1.9 5.2-4.7 5.2zm-.1-8.8h-1.7v7.2h1.7c2.2 0 3-1.7 3-3.6s-.9-3.6-3-3.6z"/></svg>;
