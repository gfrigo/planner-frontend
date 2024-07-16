import { Plus} from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinksTrip } from "./important-links-trip";
import { GuestsTrip } from "./guests-trip";
import { Activities } from "./activities-trip";
import { DestinationAndHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";

export function TripDetails() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
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
          <div className="w-full h-px bg-zinc-800" />
          <GuestsTrip />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
