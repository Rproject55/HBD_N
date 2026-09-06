import { describe, it, expect } from "vitest";
import {
  getTranslation,
  getTranslationValue,
  translations,
} from "@/i18n";
import { parseBirthdayUrlParams } from "@/features/core/store/urlParams";
import {
  getHighlySpecificLetter,
  getBigWishes,
} from "@/features/core/store/SuperPersonalizedLogic";
import {
  INDONESIAN_SPECIAL_QUOTES,
  INDONESIAN_HEART_MESSAGES,
} from "@/config/indonesianTemplates";
import { idTranslations } from "@/i18n/locales/id";
import { RelationshipType, GenderType } from "@/features/core/store/useBirthdayStore";

describe("Indonesian (Bahasa Indonesia) Localization Test Suite", () => {
  describe("1. Dictionary Structure & Key Completeness", () => {
    it("exports idTranslations conforming to the TranslationSchema", () => {
      expect(idTranslations).toBeDefined();
      expect(translations.id).toBeDefined();
      expect(translations.id).toBe(idTranslations);
    });

    it("has all required top-level sections with valid strings", () => {
      const sections = [
        "common",
        "splash",
        "intro",
        "cake",
        "memories",
        "quiz",
        "gift",
        "heartTree",
        "chat",
      ] as const;

      for (const section of sections) {
        expect(idTranslations[section], `Section ${section} must exist`).toBeDefined();
        for (const [key, value] of Object.entries(idTranslations[section])) {
          expect(typeof value, `${section}.${key} should be string`).toBe("string");
          expect((value as string).length, `${section}.${key} should not be empty`).toBeGreaterThan(0);
        }
      }
    });

    it("matches English key structure 1-to-1", () => {
      const en = translations.en;
      const id = translations.id;

      for (const section of Object.keys(en) as (keyof typeof en)[]) {
        const enKeys = Object.keys(en[section]);
        const idKeys = Object.keys(id[section]);
        expect(idKeys.sort()).toEqual(enKeys.sort());
      }
    });
  });

  describe("2. Alias Resolution & Normalization", () => {
    it("resolves Indonesian language variations to the Indonesian dictionary", () => {
      const aliases = [
        "id",
        "ID",
        "Id",
        "indonesian",
        "INDONESIAN",
        "Indonesian",
        "bahasa",
        "BAHASA",
        "indonesia",
        "INDONESIA",
        "  id  ",
        "  indonesian  ",
      ];

      for (const alias of aliases) {
        const dict = getTranslation(alias);
        expect(dict.common.happyBirthday).toBe("Selamat Ulang Tahun");
        expect(dict.common.skipIntro).toBe("Lewati Intro ⏭");
        expect(dict.gift.yourCode).toBe("Kodemu:");
      }
    });
  });

  describe("3. Parameter Interpolation", () => {
    it("interpolates dynamic parameters into Indonesian templates correctly", () => {
      expect(getTranslationValue("id", "common.dear", { name: "Budi" })).toBe("Teruntuk Budi,");
      expect(getTranslationValue("id", "common.happyNthBirthday", { age: 25 })).toBe("Selamat Ulang Tahun ke-25");
      expect(getTranslationValue("id", "common.clickMoreTimes", { count: 3 })).toBe("Klik 🎂 3 kali lagi!");
      expect(
        getTranslationValue("id", "quiz.scoreSummary", { score: 5, total: 5, name: "Siti" })
      ).toBe("Kamu mencetak skor 5/5 di Trivia Siti!");
    });
  });

  describe("4. URL Parameter Integration", () => {
    it("parses ?lang=id, indonesian, and bahasa correctly", () => {
      expect(parseBirthdayUrlParams("?lang=id").language).toBe("id");
      expect(parseBirthdayUrlParams("?language=indonesian").language).toBe("id");
      expect(parseBirthdayUrlParams("?locale=bahasa").language).toBe("id");
      expect(parseBirthdayUrlParams("?lang=indonesia").language).toBe("id");
    });
  });

  describe("5. Indonesian Emotional Letters & Personalization", () => {
    const relationships: RelationshipType[] = [
      "partner",
      "friend",
      "brother",
      "sister",
      "father",
      "mother",
      "sibling",
      "grandfather",
      "grandmother",
      "uncle",
      "aunt",
      "cousin",
      "son",
      "daughter",
      "guardian",
      "colleague",
      "mentor",
      "family",
    ];
    const genders: GenderType[] = ["male", "female", "other"];

    it("generates rich Indonesian emotional letters for all relationship archetypes without unreplaced placeholders", () => {
      for (const rel of relationships) {
        for (const gender of genders) {
          const sender = "Rian";
          const recipient = "Dewi";
          const letter = getHighlySpecificLetter(recipient, rel, gender, [], "id", sender);

          expect(letter).toContain(recipient);
          expect(letter.length).toBeGreaterThan(100);
          expect(letter).not.toContain("[Your Name]");
          expect(letter).not.toContain("[Nama Anda]");
          expect(letter).not.toContain("[Votre Nom]");
        }
      }
    });

    it("properly swaps [Nama Anda] with sender name when provided or empty when omitted", () => {
      const withSender = getHighlySpecificLetter("Budi", "friend", "male", [], "id", "Andi");
      expect(withSender).toContain("Andi");
      expect(withSender).not.toContain("[Nama Anda]");

      const withoutSender = getHighlySpecificLetter("Budi", "friend", "male", [], "id", "");
      expect(withoutSender).not.toContain("[Nama Anda]");
    });
  });

  describe("6. Indonesian Big Wishes & HeartTree Quotes", () => {
    it("generates Indonesian Big Wishes with relevant triggers", () => {
      const partnerWishes = getBigWishes("Dewi", "partner", "female", ["coding", "car"], "id");
      expect(partnerWishes.some(w => w.emoji === "💻")).toBe(true);
      expect(partnerWishes.some(w => w.emoji === "🏎️")).toBe(true);
      expect(partnerWishes.some(w => w.emoji === "❤️")).toBe(true);

      const friendWishes = getBigWishes("Budi", "friend", "male", [], "id");
      expect(friendWishes.some(w => w.emoji === "🔥")).toBe(true);
      expect(friendWishes.some(w => w.emoji === "🍻")).toBe(true);
    });

    it("provides 12 distinct Indonesian heart messages for HeartTree leaves", () => {
      expect(INDONESIAN_HEART_MESSAGES.length).toBe(12);
      for (const msg of INDONESIAN_HEART_MESSAGES) {
        expect(typeof msg).toBe("string");
        expect(msg.length).toBeGreaterThan(15);
      }
    });

    it("provides Indonesian special quotes across relationship archetypes", () => {
      expect(INDONESIAN_SPECIAL_QUOTES.partner.male.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.partner.female.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.friend.legend.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.friend.friendly.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.brother.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.sister.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.father.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.mother.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.colleague.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.mentor.length).toBeGreaterThan(0);
      expect(INDONESIAN_SPECIAL_QUOTES.family.length).toBeGreaterThan(0);
    });
  });
});
