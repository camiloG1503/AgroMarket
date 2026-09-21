import React, { useRef } from 'react'

export default function ProfileAvatar({ src = null, alt = 'Avatar', onUpload }) {
  const inputRef = useRef(null)

  function openFileDialog() {
    inputRef.current?.click()
  }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    if (onUpload) onUpload(file)
  }

  return (
    <div className="profile-avatar d-flex flex-column align-items-center" style={{ gap: 8 }}>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />

      <div className="avatar-box rounded-circle overflow-hidden d-flex align-items-center justify-content-center" style={{ width: 120, height: 120, background: '#f6f7f8' }}>
        {src ? (
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="#c8c8c8" />
            <path d="M3 21c0-3.866 3.582-7 9-7s9 3.134 9 7v1H3v-1z" fill="#e6e6e6" />
          </svg>
        )}
      </div>

      <div>
        <button type="button" onClick={openFileDialog} className="btn btn-outline-secondary btn-sm">Cambiar Foto</button>
      </div>
    </div>
  )
}