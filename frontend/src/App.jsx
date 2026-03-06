import { useState, useEffect } from 'react'
import userService from './services/userService'
import Navbar from './components/Navbar'
import UserForm from './components/UserForm'
import UserList from './components/UserList'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState(null)
  // Bonus A : utilisateur en cours d'édition
  const [selectedUser, setSelectedUser] = useState(null)
  // Bonus B : filtre par rôle côté frontend
  const [filterRole, setFilterRole] = useState(null)

  useEffect(() => {
    userService.getAll()
      .then((res) => setUsers(res.data.data))
      .catch(() => setError('Impossible de charger les utilisateurs. Le serveur est-il démarré ?'))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(data) {
    try {
      setFormError(null)
      const res = await userService.create(data)
      setUsers([...users, res.data.data])
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la création.'
      setFormError(message)
      throw err
    }
  }

  // Bonus A : mise à jour d'un utilisateur existant
  async function handleUpdate(data) {
    try {
      setFormError(null)
      const res = await userService.update(selectedUser._id, data)
      setUsers(users.map((u) => (u._id === selectedUser._id ? res.data.data : u)))
      setSelectedUser(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la mise à jour.'
      setFormError(message)
      throw err
    }
  }

  async function handleDelete(id) {
    try {
      await userService.remove(id)
      setUsers(users.filter((u) => u._id !== id))
      if (selectedUser?._id === id) setSelectedUser(null)
    } catch {
      setError('Erreur lors de la suppression.')
    }
  }

  return (
    <div>
      <Navbar count={users.length} />
      <main style={styles.main}>
        <UserForm
          onSubmit={selectedUser ? handleUpdate : handleCreate}
          apiError={formError}
          selectedUser={selectedUser}
          onCancelEdit={() => { setSelectedUser(null); setFormError(null) }}
        />

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Liste des utilisateurs</h2>
            {/* Bonus B : boutons de filtre */}
            <div style={styles.filters}>
              {[null, 'admin', 'user'].map((role) => (
                <button
                  key={role ?? 'all'}
                  style={{ ...styles.filterBtn, ...(filterRole === role ? styles.filterBtnActive : {}) }}
                  onClick={() => setFilterRole(role)}
                >
                  {role ?? 'Tous'}
                </button>
              ))}
            </div>
          </div>
          <UserList
            users={users}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            onEdit={setSelectedUser}
            filterRole={filterRole}
          />
        </section>
      </main>
    </div>
  )
}

const styles = {
  main: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#374151',
  },
  filters: {
    display: 'flex',
    gap: '0.5rem',
  },
  filterBtn: {
    padding: '0.3rem 0.8rem',
    border: '1px solid #cbd5e1',
    borderRadius: '999px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: '#475569',
  },
  filterBtnActive: {
    backgroundColor: '#2563eb',
    color: 'white',
    borderColor: '#2563eb',
  },
}

export default App
