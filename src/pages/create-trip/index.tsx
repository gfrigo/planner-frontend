import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestsModal } from "./invite-guests-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./destination-and-date-step"
import { InviteGuestsStep } from "./invite-guests-step"

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)

  const [emailsToEnvite, setEmailsToEnvite] = useState([
    'gfrigo.sena@gmail.com'
  ])

  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  function openGuestsInput(){
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput(){
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal(){
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal(){
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal(){
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal(){
    setIsConfirmTripModalOpen(false)
  }

  function addNewemailsToEnvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    
    const data = new FormData(event.currentTarget)
    const email = data.get("email")?.toString()

    if(!email){
      return
    }

    if(emailsToEnvite.includes(email)){
      return
    }

    setEmailsToEnvite([
      ...emailsToEnvite,
      email
    ])

    event.currentTarget.reset()
}

  function removeEmailFromInvite(emailToRemoved:string){
    const newEmailList = emailsToEnvite.filter(email => email !== emailToRemoved)

    setEmailsToEnvite(newEmailList)
  }

  function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    navigate("/trips/123")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.SVG" alt="planner" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        
        <div className="space-y-4">
          <DestinationAndDateStep
          closeGuestsInput={closeGuestsInput}
          isGuestsInputOpen={isGuestsInputOpen}
          openGuestsInput={openGuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
            emailsToEnvite={emailsToEnvite}
            openConfirmTripModal={openConfirmTripModal}
            openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a></p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
        closeGuestsModal={closeGuestsModal}
        emailsToEnvite={emailsToEnvite}
        removeEmailFromInvite={removeEmailFromInvite}
        addNewemailsToEnvite={addNewemailsToEnvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
        closeConfirmTripModal={closeConfirmTripModal}
        createTrip={createTrip} 
        /> 
      )}
    </div>
  )
}