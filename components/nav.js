import Link from "next/link";
import { useUser } from "../context/user";
import { Navbar, Button, Dropdown, Avatar, Spinner, Modal, Label, TextInput, Checkbox } from "flowbite-react"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


const Nav = () => {
  const { user, login, logout } = useUser();
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('')
  const router = useRouter();
  
  useEffect(()=>{
  },[user]);

  const validateEmail = (email) => {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }
  const handleEmailLogin = async (email) => {
    try {
      setLoadingEmail(true)
      const {error}  = await login({ email })
      if (error) throw error
      setEmailSent('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoadingEmail(false)
    }
  }
  const handleGoogleLogin = () => {
    setLoadingGoogle(true);
    login({provider: "google"});
  }
  const handleLogout = async () => {
    await logout();
  }
  return (
    <>
    <Navbar
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://tunnelassistant.gr/images/logos.png"
          className="mr-3 h-6 sm:h-9"
          alt="Tunnel Assistant Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Tunnel Assistant
        </span>
      </Navbar.Brand>

        { !user &&

          <div className="flex md:order-2">
            <Button onClick={()=>setShowLoginForm(true)} >
              Get started
            </Button>
          </div>
        } 

        {( user) && 
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={<Avatar alt="User settings" img={user.user_metadata.avatar_url} rounded={true}/>}
            >
              <Dropdown.Header>
                <span className="block text-sm">
                {user.user_metadata.full_name}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={()=>router.push("/projects")}>
                Projects
              </Dropdown.Item>
              <Dropdown.Item onClick={()=>router.push("/settings")}>
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={()=>handleLogout()}>
                  Sign out
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        }
              

      
      <Navbar.Collapse>
        <Navbar.Link
          href="/navbars"
          active={true}
        >
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          About
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          Services
        </Navbar.Link>
        <Navbar.Link href="/navbars">
          Pricing
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>

    {showLoginForm && 
      <Modal
        show={showLoginForm}
        size="md"
        popup={true}
        onClose={()=>setShowLoginForm(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <Label
                className="mb-2 block"
                htmlFor="email"
              >
                Your email
              </Label>
              <TextInput
                id="email"
                className="dark:border-gray-500 dark:bg-gray-600"
                placeholder="name@company.com"
                required={true}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            
            {(!loadingEmail && !emailSent) && 
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded" disabled={!validateEmail(email)} onClick={()=>handleEmailLogin(email)}>
                Send magic link
              </button>
            }

            {loadingEmail && 
                <button color="alternative" className="w-full">
                  <Spinner aria-label="Spinner button example" />
                  <span className="pl-3">
                    Loading...
                  </span>
                </button>
            }
            <p>{emailSent}</p>
            <hr/>
            
            {!loadingGoogle && 
              <button onClick={()=>handleGoogleLogin()} className="w-full bg-red-200 hover:bg-red-500 hover:text-white text-red-500 text-center py-2 px-4 rounded">Sign in with Google</button>
              // <Button className="w-full" >
              //   Sign in with Google
              // </Button>
            }

            {loadingGoogle && 
                <button color="alternative" className="w-full">
                  <Spinner aria-label="Spinner button example" />
                  <span className="pl-3">
                    Loading...
                  </span>
                </button>
            }
          </div>
        </Modal.Body>
      </Modal>
  }
    </>
    
  );
};

export default Nav;