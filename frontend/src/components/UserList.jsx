import UserCard from './UserCard'

// Bonus B : filterRole pour filtrer côté frontend
function UserList({ users, loading, error, onDelete, onEdit, filterRole }) {
  if (loading) return <p style={styles.message}>Chargement...</p>
  if (error) return <p style={styles.error}>{error}</p>

  const filtered = filterRole ? users.filter((u) => u.role === filterRole) : users

  if (filtered.length === 0) return <p style={styles.message}>Aucun utilisateur.</p>

  return (
    <div style={styles.grid}>
      {filtered.map((user) => (
        <UserCard key={user._id} user={user} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  message: {
    color: '#64748b',
    fontStyle: 'italic',
  },
  error: {
    color: '#dc2626',
  },
}

export default UserList
