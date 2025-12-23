import { useCallback } from "react";
import { supabase } from "./supabaseClient";

/**
 * Hook to log onboarding progress to Supabase.
 */
export function useProgressTracker({ userId = "guest", sessionId = "demo-session" } = {}) {
  const trackNext = useCallback(
    async ({ step, name }) => {
      if (!supabase) {
        console.warn("Supabase env vars missing; skipping progress_tracker insert.");
        return { skipped: true };
      }

      const now = new Date().toISOString();
      const designerName = name?.trim() || "anonymous";
      const id = (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID()) || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      const insertPayload = {
        id,
        designer_name: designerName,
        current_step: step,
        is_stuck: false,
        updated_at: now,
      };

      const { error } = await supabase.from("progress_tracker").insert(insertPayload);
      if (error) {
        // If duplicate (designer_name unique) or other conflict, try update
        const conflict = error.code === "23505" || (error.message && error.message.toLowerCase().includes("duplicate"));
        if (conflict) {
          const { error: updateError } = await supabase
            .from("progress_tracker")
            .update({ current_step: step, updated_at: now })
            .eq("designer_name", designerName);
          if (updateError) {
            console.error("Supabase update failed", updateError);
            return { error: updateError };
          }
          return { error: null };
        }
        console.error("Supabase insert failed", error);
        return { error };
      }
      return { error: null };
    },
    [sessionId, supabase, userId],
  );

  return trackNext;
}

