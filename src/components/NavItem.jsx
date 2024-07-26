// eslint-disable-next-line react/prop-types
export default function NavItem({ ref_props, func_props, styling_props, label }) {
 return (
  <li ref={ref_props} onClick={func_props} className={`cursor-pointer text-sm relative tracking-wider text-dark-grayish-blue hover:text-very-dark-blue ease-in-out duration-75 hover:font-bold ${styling_props}`} data-nav-label={label}>
   {label}
  </li>
 )
}
