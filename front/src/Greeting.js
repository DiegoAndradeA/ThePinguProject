export function Greeting(props) {
    console.log(props)
    const married = true;
    const user = {
      firstName: 'ryan',
      lastName: 'smith'
    }
    return <div>
      <h1>{user.firstName} </h1>
      <h2>{props.title}</h2>
      <h2>{props.a}</h2>
      <h3>{married ? "feofe": "feofeo"}</h3>
    </div>
  }