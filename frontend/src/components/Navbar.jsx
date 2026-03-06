function Navbar({ count }) {
  return (
    <nav style={styles.nav}>
      <span style={styles.title}>Gestion des utilisateurs</span>
      <span style={styles.count}>{count} utilisateur{count !== 1 ? 's' : ''}</span>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '1rem 2rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  count: {
    fontSize: '0.9rem',
    opacity: 0.85,
  },
}

export default Navbar
