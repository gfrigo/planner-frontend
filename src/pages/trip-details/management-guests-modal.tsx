import { ArrowRight, Mail, User, X } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface ManagementGuestsModalProps {
  closeManagementGuests: () => void;
}

interface Participant {
  id: string,
  email: string,
  name: string | null,
  isConfirmed: boolean,
}

interface InviteParticipant {
  email: string,
}

interface ConfirmParticipant {
  name: string,
}

export function ManagementGuestsModal({
  closeManagementGuests,
}: ManagementGuestsModalProps) {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [inviteParticipants, setInviteParticipants] = useState<InviteParticipant | null>(null);
  const [confirmParticipants, setConfirmParticipants] = useState<ConfirmParticipant | null>(null);
  const [modalConfiguration, setModalConfiguration] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data));
  }, [tripId]);

  useEffect(() => {
    if (selectedEmail) {
      api.post(`/trips/${tripId}/invite`, { email: selectedEmail })
        .then(response => setParticipantId(response.data.id));
    }
  }, [selectedEmail, tripId]);

  function openModalConfiguration(email: string) {
    setSelectedEmail(email);
    setModalConfiguration(true);
  }

  function closeModalConfiguration() {
    setModalConfiguration(false);
  }

  

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gerenciar convidados</h2>
            <button type="button" onClick={closeManagementGuests}>
              <X className="size=5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Visualize o status dos convidados de sua viagem.
          </p>
        </div>

        {!modalConfiguration ? (
          <div>
            {participants.map(participant => (
              <div key={participant.id}>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => openModalConfiguration(participant.email)}
                    className="py-1.5 px-2.5 mb-3 rounded-md bg-zinc-800 flex justify-between items-center gap-2 w-full"
                  >
                    <span className="block text-sm text-zinc-100 truncate">
                      {participant.email}
                    </span>
                    <ArrowRight
                      className="size=5 text-zinc-400"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Mail className="text-zinc-400 size-5" />
              <span
                className="text-lg text-zinc-100 flex-1 cursor-not-allowed pointer-events-none"
              >
                {selectedEmail}
              </span>
            </div>

            <form className="space-y-3 mt-2">
              <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="text-zinc-400 size-5" />
                <input
                  name="name"
                  placeholder="Nome do convidado"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <Button
                type="submit"
                size='full'
              >
                Cadastrar convidado
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
