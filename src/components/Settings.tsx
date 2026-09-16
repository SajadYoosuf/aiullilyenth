import { useEffect, useRef, useState } from "react";
import type { Config, Language } from "../types";
import { t } from "../i18n";
import {
  chooseModels,
  GeminiError,
  listModels,
  removeKey,
  saveConfig,
  saveModels,
  textModels,
} from "../lib/gemini";
import Icon from "./Icon";
import KeySetupGuide from "./KeySetupGuide";
export default function Settings({
  lang,
  config,
  onChange,
  onClose,
  onDemo,
  onCustom,
}: {
  lang: Language;
  config: Config;
  onChange: (c: Config) => void;
  onClose: () => void;
  onDemo: () => void;
  onCustom: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const abort = useRef<AbortController | null>(null);
  const [key, setKey] = useState(config.key);
  const [remember, setRemember] = useState(config.remember);
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    dialog.current?.showModal();
    if (config.key && !config.models.length) void refresh();
    return () => {
      abort.current?.abort();
      dialog.current?.close();
    };
  }, []);
  async function refresh(recommend = false) {
    if (!config.key) return;
    abort.current?.abort();
    setBusy(true);
    setError("");
    setStatus("");
    const ac = new AbortController();
    abort.current = ac;
    try {
      const models = await listModels(config.key, ac.signal);
      const next = chooseModels(
        models,
        recommend ? { ...config, textModel: "" } : config,
      );
      if (ac.signal.aborted) return;
      saveModels(next);
      onChange(next);
      setStatus(t(lang, "modelsRefreshed"));
    } catch (e) {
      if (!ac.signal.aborted)
        setError(t(lang, e instanceof GeminiError ? e.code : "errorData"));
    } finally {
      if (!ac.signal.aborted) setBusy(false);
    }
  }
  async function save() {
    abort.current?.abort();
    setError("");
    setStatus("");
    if (!key.trim()) {
      setError(t(lang, "errorKey"));
      return;
    }
    setBusy(true);
    const ac = new AbortController();
    abort.current = ac;
    try {
      const models = await listModels(key.trim(), ac.signal);
      const next = chooseModels(models, {
        ...config,
        key: key.trim(),
        remember,
      });
      if (ac.signal.aborted) return;
      saveConfig(next);
      onChange(next);
      setStatus(t(lang, "saved"));
    } catch (e) {
      if (!ac.signal.aborted)
        setError(t(lang, e instanceof GeminiError ? e.code : "errorData"));
    } finally {
      if (!ac.signal.aborted) setBusy(false);
    }
  }
  function remove() {
    abort.current?.abort();
    setBusy(false);
    try {
      removeKey();
      setKey("");
      onChange({ ...config, key: "", remember: false });
      setRemember(false);
      setStatus(t(lang, "removed"));
      setError("");
    } catch {
      setError(t(lang, "errorStorage"));
    }
  }
  function modelChange(field: "textModel" | "embeddingModel", value: string) {
    const next = { ...config, [field]: value };
    try {
      saveModels(next);
      onChange(next);
    } catch {
      setError(t(lang, "errorStorage"));
    }
  }
  return (
    <dialog
      ref={dialog}
      onCancel={onClose}
      className="settings-dialog"
      aria-labelledby="settings-title"
    >
      <div className="dialog-heading">
        <div>
          <div className="eyebrow">{t(lang, "settings")}</div>
          <h2 id="settings-title">{t(lang, "keyTitle")}</h2>
        </div>
        <button
          className="icon-button"
          aria-label={t(lang, "close")}
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      </div>
      <p>{t(lang, "keyIntro")}</p>
      <KeySetupGuide lang={lang} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <label htmlFor="api-key">{t(lang, "keyLabel")}</label>
        <div className="key-field">
          <input
            autoFocus
            id="api-key"
            type={show ? "text" : "password"}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="none"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-pressed={show}
          >
            {t(lang, show ? "hide" : "show")}
          </button>
        </div>
        <label className="check-label">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <span>{t(lang, "remember")}</span>
        </label>
        <p className="privacy-note">
          <Icon name="key" />
          {t(lang, "notice")}
        </p>
        <a
          className="external-link"
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noreferrer"
        >
          {t(lang, "createKey")} ↗
        </a>
        <button type="submit" className="primary full-width" disabled={busy}>
          {t(lang, busy ? "saving" : "save")}
          {busy && <span className="spinner" />}
        </button>
      </form>
      {status && (
        <p className="success" role="status">
          {status}
        </p>
      )}
      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={onDemo}>{t(lang, "demoFallback")}</button>
        </div>
      )}
      {config.models.length > 0 && (
        <div className="model-fields">
          <p>{t(lang, "modelAccessNote")}</p>
          <label htmlFor="text-model">{t(lang, "textModel")}</label>
          <select
            id="text-model"
            value={config.textModel}
            onChange={(e) => modelChange("textModel", e.target.value)}
          >
            {textModels(config.models).map((m) => (
              <option key={m.name} value={m.name}>
                {m.displayName}
              </option>
            ))}
          </select>
          <button disabled={busy} onClick={() => void refresh(true)}>
            {t(lang, "recommendedModel")}
          </button>
          <label htmlFor="embedding-model">{t(lang, "embeddingModel")}</label>
          <select
            id="embedding-model"
            value={config.embeddingModel}
            onChange={(e) => modelChange("embeddingModel", e.target.value)}
          >
            <option value="">{t(lang, "noEmbedding")}</option>
            {config.models
              .filter((m) =>
                m.supportedGenerationMethods.includes("embedContent"),
              )
              .map((m) => (
                <option key={m.name} value={m.name}>
                  {m.displayName}
                </option>
              ))}
          </select>
        </div>
      )}
      {config.key && (
        <button
          className="full-width"
          disabled={busy}
          onClick={() => void refresh()}
        >
          {t(lang, busy ? "saving" : "refreshModels")}
        </button>
      )}
      {config.key && (
        <button className="primary full-width" disabled={busy} onClick={onCustom}>
          {lang === "ml" ? "സ്വന്തം വാക്യം പരീക്ഷിക്കാം" : "Try my own sentence"}
        </button>
      )}
      {config.key && (
        <button className="remove-key" onClick={remove}>
          {t(lang, "remove")}
        </button>
      )}
    </dialog>
  );
}
