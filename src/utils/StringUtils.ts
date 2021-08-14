export namespace StringUtils {
  export const getNameInitials = (name: any) =>
    ((fullName) =>
      fullName
        .map((n: any, i: any) => (i === 0 || i === fullName.length - 1) && n[0])
        .filter((n: any) => n)
        .join(""))(name.split(" "));

  export const generateKey = (pre: any) => `${pre}_${new Date().getTime()}`;

  export const getStringHash = (input: any) => {
    if (input) {
      let hash: number = 0,
        len = input.length;
      for (let i = 0; i < len; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash |= 0;
      }
      if (hash < 0) hash = Math.abs(hash);
      return hash;
    }
    return 0;
  };

  export const getRoleMappingName = (role: any) => {
    const usersByRoles: any = {
      host: "Hosts",
      attendee: "Attendees",
      "external-speaker": "External Speakers",
      speaker: "Speakers",
      ops: "Ops",
    };
    return usersByRoles[role];
  };
}