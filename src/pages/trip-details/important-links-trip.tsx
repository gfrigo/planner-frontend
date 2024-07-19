import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Links {
  id: String,
  title: String,
  url: String
}

export function ImportantLinksTrip() {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Links[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl text-zinc-50">Links Importantes</h2>

      {links.length === 0 ? (
        <div className="flex items-center justify-center mt-[250px]">
          <p className="text-zinc-500 text-sm">Nenhum link cadastrado</p>
        </div>
      ) : (
        <div className="space-y-5">
          {links.map(link => (
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <span
                  className="block text-sm text-zinc-400 truncate hover:text-zinc-200"
                >
                  {link.url}
                </span>
              </div>
              <Link2 className="text-zinc-400 size-5 shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
