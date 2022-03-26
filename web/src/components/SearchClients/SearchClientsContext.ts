import { createContext, Dispatch, SetStateAction } from "react";
import Client from "../../types/Client";

interface Context {
	client: Client | undefined;
	setClient: Dispatch<SetStateAction<Client | undefined>>;
}

const SearchClientsContext = createContext<Context>({
	client: undefined,
	setClient: () => {},
});

export default SearchClientsContext;
