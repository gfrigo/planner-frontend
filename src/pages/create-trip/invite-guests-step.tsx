import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestsStepProps{
    openGuestsModal: () => void
    emailsToEnvite: string[]
    openConfirmTripModal: () => void
}

export function InviteGuestsStep({
    emailsToEnvite,
    openConfirmTripModal,
    openGuestsModal,
}:InviteGuestsStepProps){
    return(
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
                <UserRoundPlus className="size-5 text-zinc-400"/>
                {emailsToEnvite.length > 0 ? (
                  <span className="text-zinc-100 text-lg flex-1">{emailsToEnvite.length} pessoa(s) convidada(s)</span>
                ) : (
                  <span className="text-zinc-400 text-lg flex-1">Quem estará na viagem?</span>
                )}
            </button>
          
            <button onClick={openConfirmTripModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirmar viagem
                <ArrowRight className="size-5"/>
            </button>
            </div>
    )
}