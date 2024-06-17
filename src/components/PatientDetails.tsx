import type { Patient } from '../types'
import PatientDetailItem from './PatientDetailItem.tsx'
import { usePatientStore } from '../store.ts'
import { toast } from 'react-toastify'

type PatientDetailsProps = {
  patient: Patient
}

function PatientDetails({patient}: PatientDetailsProps) {
  const deletePatient = usePatientStore((state) => state.deletePatient)
  const getPatientById = usePatientStore((state) => state.getPatientById)
  const resetActiveId = usePatientStore((state) => state.resetActiveId)

  const handleEdit = () => {
    getPatientById(patient.id)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const handleDelete = () => {
    deletePatient(patient.id)
    resetActiveId()
    toast.error('Paciente eliminado')
  }

  return (
    <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'>
      <PatientDetailItem label={'ID'} data={patient.id} />
      <PatientDetailItem label={'Nombre'} data={patient.name} />
      <PatientDetailItem label={'Propietario'} data={patient.caretaker} />
      <PatientDetailItem label={'Email'} data={patient.email} />
      <PatientDetailItem label={'Fecha alta'} data={patient.date.toString()} />
      <PatientDetailItem label={'Síntomas'} data={patient.symptoms} />

      <div className='flex flex-col lg:flex-row gap-3 justify-between mt-10'>
        <button
          className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg'
          type='button'
          onClick={handleEdit}
        >
          Editar
        </button>

        <button
          className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
          type='button'
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default PatientDetails