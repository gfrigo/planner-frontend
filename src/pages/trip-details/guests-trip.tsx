import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
  id: string,
  email: string,
  name: string | null,
  isConfirmed: boolean,
}

export function GuestsTrip() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data))
    console.log(participants)
  }, [tripId])

  return (
    <div className="space-y-6">
      
      <div className="space-y-5">

      {participants.length === 0 && (
        <div className="flex items-center justify-center mt-[250px]">
          <p className="text-zinc-500 text-sm">Nenhum link cadastrado</p>
        </div>
      )}

        {participants.map((participant, index) => {
          return(
            <div key={participant.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              {!participant.name ? (
                <span className="block font-medium text-zinc-100">
                  {`Convidado ${index + 1}`}
                </span>
              ):(
                <span className="block font-medium text-zinc-100">
                  {participant.name}
                </span>
              )}
              
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.isConfirmed ? (
                <div>
                <CheckCircle2 className="text-green-400 size-5 shrink-0" />
                </div>
            ) : (
              <div>
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              </div>
            )}
          </div>
          )
        })}
      </div>
    </div>
  );
}
