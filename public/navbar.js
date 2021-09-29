function NavBar(){

  const ctx = React.useContext(UserContext);

  console.log(ctx[0].user)

  const handleLogoutClick = () => {
    ctx.pop();
    let data = [{
      user:'Tim',
      email:'timothee.huerne@gmail.com',
      password:'secret',
      balance:100,
      isConnected: false}]
    //Add the connected user into the global variable
    ctx.push(data);
  }

  const logoutButton = () => {
    return <button variant="secondary" onClick={handleLogoutClick}>Logout</button>
  }

  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>         
        </ul>
      </div>
      <form inline="true" className="mx-3">
          {logoutButton()}
      </form>
    </nav>

  );
}