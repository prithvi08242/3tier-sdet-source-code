import { useParams } from "react-router-dom";
import { getSection } from "@/data/sections";
import { BasicForm, ButtonInteractions, CheckboxesRadio, Dropdowns } from "@/sections/formsSections";
import { LocatorPractice, HiddenElements, ShadowDom, ComplexDom } from "@/sections/locatorSections";
import { DynamicContent, WaitsSync, StaleElement, DynamicList, NetworkDelay, FlakyElement } from "@/sections/dynamicSections";
import { DragDrop, HoverMenu, Tooltip, KeyboardActions, Slider, ScrollTesting, DatePicker } from "@/sections/interactionSections";
import { TableAutomation, Alerts, ModalDialog, IFrameSection, TabComponents } from "@/sections/widgetSections";
import { FileUpload, Download, MultipleWindows, AuthSimulation } from "@/sections/windowSections";

const REGISTRY = {
  "basic-form": BasicForm,
  "button-interactions": ButtonInteractions,
  "checkboxes-radio": CheckboxesRadio,
  "dropdowns": Dropdowns,
  "locator-practice": LocatorPractice,
  "dynamic-content": DynamicContent,
  "waits-sync": WaitsSync,
  "table-automation": TableAutomation,
  "alerts": Alerts,
  "modal-dialog": ModalDialog,
  "iframe": IFrameSection,
  "shadow-dom": ShadowDom,
  "drag-drop": DragDrop,
  "hover-menu": HoverMenu,
  "tooltip": Tooltip,
  "file-upload": FileUpload,
  "download": Download,
  "hidden-elements": HiddenElements,
  "scroll-testing": ScrollTesting,
  "multiple-windows": MultipleWindows,
  "auth-simulation": AuthSimulation,
  "stale-element": StaleElement,
  "dynamic-list": DynamicList,
  "network-delay": NetworkDelay,
  "flaky-element": FlakyElement,
  "keyboard-actions": KeyboardActions,
  "slider": Slider,
  "date-picker": DatePicker,
  "tab-components": TabComponents,
  "complex-dom": ComplexDom,
};

export default function SectionPage() {
  const { slug } = useParams();
  const meta = getSection(slug);
  const Comp = REGISTRY[slug];
  if (!meta || !Comp) {
    return <div data-testid="section-not-found" className="max-w-3xl mx-auto px-6 py-24 text-center text-zinc-400">Section not found.</div>;
  }
  return (
    <SectionShell num={meta.num} title={meta.title} desc={meta.desc}>
      <Comp />
    </SectionShell>
  );
}
