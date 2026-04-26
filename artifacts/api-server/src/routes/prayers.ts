import { Router, type IRouter } from "express";

interface Prayer {
  id: string;
  text: string;
  amenCount: number;
  heartCount: number;
  amenedBy: Set<string>;
  heartedBy: Set<string>;
  createdAt: number;
}

const PRAYERS: Prayer[] = [];
const MAX_PRAYERS = 200;

function seedIfEmpty() {
  if (PRAYERS.length > 0) return;
  const seeds = [
    "Hasta annem için şifa diliyorum, hep birlikte âmin diyelim.",
    "İş arıyorum, Rabbim hayırlısını nasip etsin.",
    "Kalbimi temizlemek, kırgınlıklarımı geride bırakmak istiyorum.",
    "Çocuğumun sınavına bereket olsun, korkusu olmasın.",
    "Annemle babamın araları düzelsin, evimizde huzur olsun.",
    "Hayata yeniden başlama gücü diliyorum.",
  ];
  const now = Date.now();
  seeds.forEach((text, i) => {
    PRAYERS.push({
      id: `seed_${i + 1}`,
      text,
      amenCount: Math.floor(3 + Math.random() * 22),
      heartCount: Math.floor(2 + Math.random() * 18),
      amenedBy: new Set(),
      heartedBy: new Set(),
      createdAt: now - (seeds.length - i) * 1000 * 60 * 17,
    });
  });
}

function serialize(prayer: Prayer, anonId?: string) {
  return {
    id: prayer.id,
    text: prayer.text,
    amenCount: prayer.amenCount,
    heartCount: prayer.heartCount,
    hasAmened: anonId ? prayer.amenedBy.has(anonId) : false,
    hasHearted: anonId ? prayer.heartedBy.has(anonId) : false,
    createdAt: prayer.createdAt,
  };
}

function newId(): string {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function sanitize(text: string): string {
  return text
    .normalize("NFC")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
}

const router: IRouter = Router();

router.get("/prayers", (req, res) => {
  seedIfEmpty();
  const anonId =
    typeof req.query["anonId"] === "string" ? req.query["anonId"] : undefined;
  const sorted = [...PRAYERS].sort((a, b) => b.createdAt - a.createdAt);
  res.json({ data: sorted.map((p) => serialize(p, anonId)) });
});

router.post("/prayers", (req, res) => {
  const { anonId, text } = (req.body ?? {}) as {
    anonId?: unknown;
    text?: unknown;
  };
  if (typeof anonId !== "string" || anonId.length < 4) {
    res.status(400).json({ error: "anonId required" });
    return;
  }
  if (typeof text !== "string") {
    res.status(400).json({ error: "text required" });
    return;
  }
  const cleaned = sanitize(text);
  if (cleaned.length < 4) {
    res.status(400).json({ error: "Lütfen daha açıklayıcı bir dua yazın" });
    return;
  }
  const prayer: Prayer = {
    id: newId(),
    text: cleaned,
    amenCount: 0,
    heartCount: 0,
    amenedBy: new Set(),
    heartedBy: new Set(),
    createdAt: Date.now(),
  };
  PRAYERS.unshift(prayer);
  if (PRAYERS.length > MAX_PRAYERS) {
    PRAYERS.length = MAX_PRAYERS;
  }
  res.status(201).json({ data: serialize(prayer, anonId) });
});

router.post("/prayers/:id/react", (req, res) => {
  const id = req.params["id"];
  const { anonId, reaction } = (req.body ?? {}) as {
    anonId?: unknown;
    reaction?: unknown;
  };
  if (typeof anonId !== "string" || anonId.length < 4) {
    res.status(400).json({ error: "anonId required" });
    return;
  }
  if (reaction !== "amen" && reaction !== "heart") {
    res.status(400).json({ error: "reaction must be amen or heart" });
    return;
  }
  const prayer = PRAYERS.find((p) => p.id === id);
  if (!prayer) {
    res.status(404).json({ error: "prayer not found" });
    return;
  }
  if (reaction === "amen") {
    if (prayer.amenedBy.has(anonId)) {
      prayer.amenedBy.delete(anonId);
      prayer.amenCount = Math.max(0, prayer.amenCount - 1);
    } else {
      prayer.amenedBy.add(anonId);
      prayer.amenCount += 1;
    }
  } else {
    if (prayer.heartedBy.has(anonId)) {
      prayer.heartedBy.delete(anonId);
      prayer.heartCount = Math.max(0, prayer.heartCount - 1);
    } else {
      prayer.heartedBy.add(anonId);
      prayer.heartCount += 1;
    }
  }
  res.json({
    data: { amenCount: prayer.amenCount, heartCount: prayer.heartCount },
  });
});

export default router;
