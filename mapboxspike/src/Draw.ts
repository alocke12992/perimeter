/* eslint-disable @typescript-eslint/ban-ts-comment */
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useRef } from "react";
import { ControlPosition, useControl } from "react-map-gl";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;
  onLoad?: (map: MapboxDraw | null) => void; // <- Here
  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;
};

export default function DrawControl({
  position = "top-left",
  onCreate,
  onUpdate,
  onDelete,
  onLoad,
  ...props
}: DrawControlProps) {
  const mapDrawRef = useRef<MapboxDraw | null>(null); // Ref need

  useControl<MapboxDraw>(
    () => {
      const draw = new MapboxDraw(props);
      mapDrawRef.current = draw;
      return draw;
    },
    ({ map }) => {
      if (onLoad && mapDrawRef?.current) {
        map.on("load", () => onLoad(mapDrawRef?.current));
      }
      // TODO figure out correct types
      // @ts-ignore
      map.on("draw.create", onCreate);
      // @ts-ignore
      map.on("draw.update", onUpdate);
      // @ts-ignore
      map.on("draw.delete", onDelete);
    },
    ({ map }) => {
      if (onLoad) map.off("load", () => onLoad);
      map.off("draw.create", onCreate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
    },
    {
      position,
    }
  );

  return null;
}
