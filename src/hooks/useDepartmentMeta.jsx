import { useMemo } from "react";
import { DEPARTMENTS } from "../utils/departmentsMap";

// 간단 정규화
const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, "");

function parseApiName(apiName = "") {
    const m = apiName.match(/^([^()]+)\s*(?:\(([^)]+)\))?/);
    return {
        ko: m?.[1]?.trim() || "",
        enPart: m?.[2]?.trim() || "",
    };
}

/** 순수 함수: API department_name을 DEPARTMENTS에서 찾아 반환 */
export function findDepartmentByApiName(apiName) {
    if (!apiName) return null;

    const { ko, enPart } = parseApiName(apiName);

    // 1) 한글 라벨(괄호 전)로 매칭
    let dept =
        DEPARTMENTS.find((d) => d.label.split("(")[0].trim() === ko) || null;

    // 2) 실패 시 괄호 안 영문 파트로 느슨 매칭 (Logistics ⊂ Logistics Operations)
    if (!dept && enPart) {
        dept =
            DEPARTMENTS.find((d) => norm(d.en).includes(norm(enPart))) || null;
    }

    // 3) 그래도 없으면 라벨 전체 정확 매칭
    if (!dept) {
        dept = DEPARTMENTS.find((d) => norm(d.label) === norm(apiName)) || null;
    }

    return dept; // 못 찾으면 null
}

/**
 * 훅: API department_name으로부터 {meta, id, en, label}을 제공
 * - 못 찾을 경우 괄호 안 영문(enPart)나 원문을 적절히 fallback으로 돌려줌
 */
export default function useDepartmentMeta(apiName) {
    return useMemo(() => {
        if (!apiName) {
            return { meta: null, id: null, en: "", label: "" };
        }

        const meta = findDepartmentByApiName(apiName);
        const { ko, enPart } = parseApiName(apiName);

        return {
            meta, // 전체 객체 { id, label, en, desc }
            id: meta?.id ?? null, // departmentId
            en: meta?.en ?? enPart ?? "", // 영어 제목 우선순위: 매핑 en → 괄호영문 → 빈값
            label: meta?.label ?? ko ?? apiName, // 한글 라벨 우선
        };
    }, [apiName]);
}
