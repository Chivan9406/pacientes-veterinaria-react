import { useForm } from 'react-hook-form'
import Error from './Error.tsx'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store.ts'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function PatientForm() {
  const addPatient = usePatientStore((state) => state.addPatient)
  const activeId = usePatientStore((state) => state.activeId)
  const patients = usePatientStore((state) => state.patients)
  const updatePatient = usePatientStore((state) => state.updatePatient)
  const resetActiveId = usePatientStore((state) => state.resetActiveId)
  const {register, handleSubmit, reset, watch, setValue, formState: {errors}} = useForm<DraftPatient>()

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(patient => patient.id === activeId)[0]
      setValue('name', activePatient.name)
      setValue('caretaker', activePatient.caretaker)
      setValue('email', activePatient.email)
      setValue('date', activePatient.date)
      setValue('symptoms', activePatient.symptoms)
    } else {
      reset()
    }
  }, [activeId])

  const registerPatient = (data: DraftPatient) => {
    if (activeId) {
      updatePatient(data)
      toast.info('Paciente actualizado')
    } else {
      addPatient(data)
      toast.success('Paciente añadido')
    }
    reset()
  }

  const handleReset = () => {
    resetActiveId()
    reset()
  }

  const formValues = watch()
  const isFormEmpty = Object.values(formValues).every(value => !value)

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register('name', {
              required: 'El nombre del paciente es requerido',
            })}
          />

          {errors.name && (
            <Error>{errors.name?.message}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register('caretaker', {
              required: 'El propietario es requerido',
            })}
          />

          {errors.caretaker && (
            <Error>{errors.caretaker?.message}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email no válido'
              }
            })}
          />

          {errors.email && (
            <Error>{errors.email?.message}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register('date', {
              required: 'La fecha es requerida',
            })}
          />

          {errors.date && (
            <Error>{errors.date?.message}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register('symptoms', {
              required: 'Los síntomas son requeridos',
            })}
          ></textarea>

          {errors.symptoms && (
            <Error>{errors.symptoms?.message}</Error>
          )}
        </div>

        <div className='flex flex-col gap-3 '>
          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={activeId ? 'Actualizar Paciente' : 'Guardar Paciente'}
          />

          <button
            type="button"
            className="bg-red-600 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleReset}
            disabled={isFormEmpty}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}