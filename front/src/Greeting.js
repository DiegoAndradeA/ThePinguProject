export function Greeting() {
    const married = true;
    const user = {
      firstName: 'ryan',
      lastName: 'smith'
    }
    return <div>
      <h1>{user.firstName} </h1>
      <h3>{married ? "feofe": "feofeo"}</h3>
    </div>
  }