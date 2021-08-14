import jwt_decode from "jwt-decode";

// Secret token key
export const SECRET_KEY = "UcQf2Lp8vxgBxQ==";
// Patterns
export const phoneRegExp = /^[0-9]{10}$/g;
// Roles
export const Roles = {
  Admin: "1",
  Oops: "2",
  Editior: "3",
  ScheduleManager: "4",
};

export const DB_URL = "https://ph.api.inroad.in";
// export const DB_URL = "http://localhost:3300";

// Auth token set
export const setAuthToken = (token: string): void => {
  localStorage.setItem("token", `Bearer ${token}`);
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const removeAuthToken = () => {
  return localStorage.removeItem("token");
};

// Reset Password token set
export const setResetToken = (token: string): void => {
  localStorage.setItem("reset-token", `${token}`);
};

export const getResetToken = () => {
  return localStorage.getItem("reset-token");
};

export const removeResetToken = () => {
  return localStorage.removeItem("reset-token");
};

let Loder: boolean = false;
export const setGlobalLoader = (loader: boolean) => {
  Loder = loader;
  console.log(Loder);
};

export const getGlobalLoader = () => {
  return Loder;
};

export const decodeToken = () => {
  const getToken = getAuthToken();
  if (getToken) {
    return jwt_decode(getToken as string);
  }
};

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell<T> {
  disablePadding?: boolean;
  id: keyof T;
  label: string;
}

export interface EnhancedTableProps<T> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
