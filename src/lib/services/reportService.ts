import Socket from "./socket.service";

export class ReportService {
	sendReport = (what: string, id: number) => {
		Socket.emit("reports.add", {
			what: what,
			id: id
		})
	}
}

export default new ReportService();