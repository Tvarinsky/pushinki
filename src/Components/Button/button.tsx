import "./button.scss";

export default function Button({ children, type, size, className }) {
  return <button className={`${type} ${size} ${className ?? ""}`}>{children}</button>;
}
