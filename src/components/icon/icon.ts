export const getIconHtml = (
  iconClass: string,
  value?: number | undefined,
  isSmall: boolean = false,
): string => {
  const isNumeric = !isNaN(Number(value?.toString()));
  return /* html */ `<span
  style="${isSmall ? "margin: 0;" : "margin: 0 0.25rem;"}"
  class="icon-text has-text-primary has-text-weight-bold"
>
  ${isNumeric ? `<span>${value}</span>` : ""}
  <span class="icon">
    <i class="${iconClass} ${isSmall ? "" : "fa-xl"}"></i>
  </span>
</span>`;
};
