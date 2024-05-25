import {IServiceFactoryExtended} from "../service-factory-extended.interface";
import {ServiceBase} from "../ServiceBase";
import {streamsListMockData} from "./streams-list.mock-data";
import {IStream, IStreamsListService} from "./streams-list.service.interface";

const INIT_MISSING_DATA_WITH_MOCK = true;
const STREAMS_LIST_LOCAL_STORAGE_KEY = "STREAMS_LIST";

export class StreamsListService extends ServiceBase implements IStreamsListService {
    constructor(services: IServiceFactoryExtended) {
        super(services);
        const streamsListStored = this.services.localStorage.getJson<IStream[]>(STREAMS_LIST_LOCAL_STORAGE_KEY);
        if (streamsListStored === null) {
            if (INIT_MISSING_DATA_WITH_MOCK) {
                // this.services.localStorage.setJson(STREAMS_LIST_LOCAL_STORAGE_KEY, streamsListMockData);
                this.streamsList = streamsListMockData;
            }
        } else {
            this.streamsList = streamsListStored;
        }
    }
    private streamsList: IStream[] = [];
    getList(): IStream[] {
        return this.streamsList;
    }

    addStream(stream: IStream) {
        this.streamsList?.push(stream);
        this.save();
    }

    removeStream(stream: IStream) {
        // remove by reference
        // this.streamsList = this.streamsList.splice(this.streamsList.indexOf(stream), 1);
        // remove by data
        this.streamsList = this.streamsList.filter((currentStream) => {
            return stream.url !== currentStream.url || stream.name !== currentStream.name || stream.image !== currentStream.image;
        })
        // save new list in localStorage
        this.save();
    }

    save() {
        this.services.localStorage.setJson(STREAMS_LIST_LOCAL_STORAGE_KEY, this.streamsList);
    }
}
