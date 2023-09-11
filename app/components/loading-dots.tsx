const LoadingDots = ({ color = "#000" }: { color?: string }) => {
  return (
    <span>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  )
}

export default LoadingDots
