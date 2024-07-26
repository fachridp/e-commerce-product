// eslint-disable-next-line react/prop-types
export default function Descriptive({ label, styling_props }) {
 return (
  <p className={`text-dark-grayish-blue ${styling_props}`}>{label}</p>
 )
}
