import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      resolve(typeof result === "string" ? result : "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const ROLES = [
  { value: "receptionist", label: "Receptionist" },
  { value: "aesthetic-physician", label: "Aesthetic Physician" },
  { value: "aesthetic-nurse", label: "Aesthetic Nurse" },
  { value: "open", label: "Open role – drop your CV" },
];

const API_BASE = import.meta.env.VITE_API_URL || "";

const Careers = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    openRoleText: "",
    message: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      let cvBase64: string | undefined;
      let cvFilename: string | undefined;
      if (cvFile) {
        cvBase64 = await fileToBase64(cvFile);
        cvFilename = cvFile.name;
      }
      const res = await fetch(`${API_BASE}/api/careers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cvFilename,
          cvBase64,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-cream font-rounded">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-primary/10">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Careers at Revive
              </h1>
              <p className="text-muted-foreground mt-1">
                Join our team in premium aesthetic care
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="font-serif text-xl font-semibold text-foreground mb-2">
                Thank you for applying
              </p>
              <p className="text-muted-foreground">
                We will review your application and get in touch if there is a match.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                  Role you are applying for
                </label>
                <select
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData((d) => ({ ...d, role: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
                >
                  <option value="">Select a role</option>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              {formData.role === "open" && (
                <div>
                  <label htmlFor="openRoleText" className="block text-sm font-medium text-foreground mb-2">
                    What role are you interested in?
                  </label>
                  <input
                    id="openRoleText"
                    type="text"
                    required
                    value={formData.openRoleText}
                    onChange={(e) => setFormData((d) => ({ ...d, openRoleText: e.target.value }))}
                    placeholder="e.g. Marketing Manager, Lab Technician"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground"
                  />
                </div>
              )}
              <div>
                <label htmlFor="cv" className="block text-sm font-medium text-foreground mb-2">
                  CV / Resume (PDF preferred)
                </label>
                <input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground file:mr-4 file:rounded file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Cover note (optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground resize-none"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-base font-semibold"
              >
                {submitting ? "Sending…" : "Submit application"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;
