import { useState, useEffect } from 'react'

const INITIAL_STATE = { name: '', email: '', role: 'user' }

// Bonus A : selectedUser pour le mode édition
// Bonus C : isSubmitting, successMessage
function UserForm({ onSubmit, apiError, selectedUser, onCancelEdit }) {
  const [form, setForm] = useState(INITIAL_STATE)
  const [validationError, setValidationError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Bonus A : pré-remplir le formulaire quand selectedUser change
  useEffect(() => {
    if (selectedUser) {
      setForm({ name: selectedUser.name, email: selectedUser.email, role: selectedUser.role })
    } else {
      setForm(INITIAL_STATE)
    }
    setValidationError('')
  }, [selectedUser])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email) {
      setValidationError('Les champs nom et email sont obligatoires.')
      return
    }
    setValidationError('')
    setIsSubmitting(true)
    try {
      await onSubmit(form)
      setForm(INITIAL_STATE)
      // Bonus C : message de succès temporaire
      if (!selectedUser) {
        setSuccessMessage('Utilisateur créé !')
        setTimeout(() => setSuccessMessage(''), 2000)
      }
    } catch {
      // l'erreur est affichée via la prop apiError
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEditMode = Boolean(selectedUser)
  const displayError = validationError || apiError

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>
        {isEditMode ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
      </h2>

      {displayError && <p style={styles.error}>{displayError}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}

      <label style={styles.label}>
        Nom
        <input
          style={styles.input}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Alice Martin"
        />
      </label>

      <label style={styles.label}>
        Email
        <input
          style={styles.input}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="alice@example.com"
        />
      </label>

      <label style={styles.label}>
        Rôle
        <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </label>

      <div style={styles.actions}>
        {/* Bonus C : bouton désactivé pendant l'envoi */}
        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'En cours...' : isEditMode ? 'Mettre à jour' : 'Créer'}
        </button>
        {isEditMode && (
          <button type="button" style={styles.cancelButton} onClick={onCancelEdit}>
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    padding: '1.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    maxWidth: '400px',
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    fontSize: '0.9rem',
    color: '#374151',
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '0.95rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  button: {
    flex: 1,
    padding: '0.6rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    opacity: 1,
  },
  cancelButton: {
    padding: '0.6rem 1rem',
    backgroundColor: '#e2e8f0',
    color: '#374151',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  error: {
    color: '#dc2626',
    fontSize: '0.85rem',
    margin: 0,
  },
  success: {
    color: '#16a34a',
    fontSize: '0.85rem',
    margin: 0,
  },
}

export default UserForm
