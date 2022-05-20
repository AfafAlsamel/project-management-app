import { signIn } from "next-auth/react";

function Login({ providers }) {
    return (
        <div className="flex flex-col items-center space-y-20 pt-48 min-w-full min-h-screen  
        h-screen overflow-hidden bg-black-100">

            <div>
                
           {Object.values(providers).map((provider) => (
                           <div key={provider.name}>
          {/* https://devdojo.com/tailwindcss/buttons#_ */}
                <button
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium
                 transition-all bg-black-300 rounded hover:bg-black-300 group"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })} >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-primary absolute bottom-0 
                 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full
                 mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left text-white transition-colors 
                            duration-300 ease-in-out group-hover:text-white">
                                Sign in with {provider.name}
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Login;