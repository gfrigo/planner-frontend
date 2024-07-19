import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Button } from "../../components/button";
import { addDays, format, isBefore, isEqual, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
    id: string;
    title: string;
    occursAt: string;
  }


export function Activities() {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    api.get(`trips/${tripId}/activities`).then(response => setActivities(response.data))
  }, [tripId])

  return (
    <div className="space-y-8 ">

      {activities.length === 0 && (
        <div className="flex items-center justify-center mt-[200px]">
          <p className="text-zinc-500 text-sm ">Nenhuma atividade cadastrada</p>
        </div>
      )}

      {activities.map(activity => {
        return(
          <div key={format(activity.occursAt, "d")} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">Dia {format(activity.occursAt, "d")}</span>
            <span className="text-xs text-zinc-500">{format(activity.occursAt, "EEEE", { locale: ptBR })}</span>
          </div>
              <div className="space-y-3">
                    <div className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(activity.occursAt, 'HH:mm')}h
                        </span>
                      </div>
                    </div>
              </div>
          </div>
        )
      })}
    </div>
  )
}