// Bonus C : animation d'apparition en fondu via CSS class
import './UserCard.css'

function UserCard({ user, onDelete, onEdit }) {
  const formattedDate = new Date(user.createdAt).toLocaleDateString('fr-FR')

  // Bonus C : confirmation avant suppression
  function handleDelete() {
    if (window.confirm(`Supprimer ${user.name} ?`)) {
      onDelete(user._id)
    }
  }

  return (
    <div className="user-card" style={styles.card}>
      <div style={styles.header}>
        <span style={styles.name}>{user.name}</span>
        <span style={{ ...styles.role, ...(user.role === 'admin' ? styles.admin : styles.user) }}>
          {user.role}
        </span>
      </div>
      <p style={styles.email}>{user.email}</p>
      <p style={styles.date}>Créé le {formattedDate}</p>
      <div style={styles.actions}>
        {/* Bonus A : bouton Modifier */}
        <button style={styles.editButton} onClick={() => onEdit(user)}>
          Modifier
        </button>
        <button style={styles.deleteButton} onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.25rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  role: {
    padding: '0.2rem 0.6rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  admin: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  },
  user: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
  },
  email: {
    color: '#475569',
    fontSize: '0.9rem',
    margin: 0,
  },
  date: {
    color: '#94a3b8',
    fontSize: '0.8rem',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  editButton: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}

export default UserCard
