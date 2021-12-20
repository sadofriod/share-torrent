import styled from "styled-components";
const AppContainer = styled.div`
	overflow-y: auto;
	overflow-x: hidden;
	padding: 0px 10px 10px 10px;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	box-sizing: border-box;
	& > * {
		width: 100%;
	}
	.header {
		flex: 3;
		display: flex;
		margin: 20px 0px;
		justify-content: space-between;
		align-items: flex-end;
		font-family: "Microsoft YaHei";
		.headerTitle {
			margin: 0px;
			font-size: 3.8em;
			text-decoration-line: underline;
			text-decoration-thickness: 2px;
			text-decoration-color: #f50057;
			text-underline-offset: 20%;
			line-height: 1.2;
		}
	}
	.mid {
		flex: 1;
		display: flex;
		align-items: center;
		margin: 10px 0px;
		.fileOperation {
			display: flex;
			justify-content: space-between;
			width: 100%;
			.content {
				display: flex;
				align-items: center;
				flex: 1;
				padding-right: 5px;
			}
			.uploadFileContainer {
				position: relative;
				.fileChooser {
					opacity: 0;
					position: absolute;
					top: 0px;
					left: 0px;
					display: block;
					height: 100%;
					width: 100%;
				}
			}
		}
	}
	.bottom {
		height: 100%;
		width: 100%;
		position: relative;
	}
`;

export default AppContainer;
