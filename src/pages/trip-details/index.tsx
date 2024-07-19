import { Plus, UserCog} from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinksTrip } from "./important-links-trip";
import { GuestsTrip } from "./guests-trip";
import { Activities } from "./activities-trip";
import { DestinationAndHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";
import { ManagementGuestsModal } from "./management-guests-modal";

export function TripDetails() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const [isCreateLinkModalOpen, setIsLinkActivityModalOpen] = useState(false);
  const [isManagementGuestsOpen, setIsManagementGuestsOpen] = useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  function openCreateLinkModal(){
    setIsLinkActivityModalOpen(true)
  }

  function closeCreateLinkModal(){
    setIsLinkActivityModalOpen(false)
  }

  function openManagementGuests(){
    setIsManagementGuestsOpen(true)
  }

  function closeManagementGuests(){
    setIsManagementGuestsOpen(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl text-zinc-50 font-semibold">Atividades</h2>
            
            <Button
            onClick={openCreateActivityModal}
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </Button> 

          </div>
          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinksTrip />
          
          <Button
          onClick={openCreateLinkModal}
          variant="secondary"
          size="full"
          >
          <Plus className="size-5" />
          Cadastrar novo link
        </Button>

        <div className="w-full h-px bg-zinc-800" />
        <h2 className="font-semibold text-xl font-zinc-50">Convidados</h2>
        <GuestsTrip />
        <Button
          variant="secondary"
          size="full"
          onClick={openManagementGuests}
          >
          <UserCog className="text-zinc-400 size-5"/>
          Gerenciar convidados
        </Button>
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}

      {isCreateLinkModalOpen && (
        <CreateLinkModal
        closeCreateLinkModal={closeCreateLinkModal}
        />
      )}

      {isManagementGuestsOpen && (
        <ManagementGuestsModal
        closeManagementGuests={closeManagementGuests}
        />
      )}
    </div>
  );
}
