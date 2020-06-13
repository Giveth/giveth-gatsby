import React from 'react'

const UserDetails = props => {
  const { user, balance, logout } = props
  return (
    <div
      style={{
        position: 'absolute',
        right: '20px',
        top: '20px',
        color: 'white'
      }}
    >
      <div
        sx={{
          display: 'grid',
          gridGap: 4,
          gridTemplateColumns: ['auto', '1fr 256px']
        }}
      >
        <main>
          {user.publicAddress}
          <p>Your balance:{balance}</p>
          <p>
            <button onClick={logout}>logout</button>
          </p>
        </main>
        <aside>
          <img style={{ width: '50px' }} src={user.profileImage} />
        </aside>
      </div>
    </div>
  )
}

export default UserDetails
