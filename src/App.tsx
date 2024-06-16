import PatientForm from './components/PatientForm.tsx'
import PatientList from './components/PatientList.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <div className='container mx-auto mt-20'>
        <h1 className='font-black text-5xl text-center md:w-2/3 md:mx-auto'>
          Pacientes de {''}
          <span className='text-indigo-700'>Veterinaria</span>
        </h1>

        <div className='mt-12 md:flex'>
          <PatientForm />
          <PatientList />
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default App
