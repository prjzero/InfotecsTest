USE [InfoTecsTestAppEntities]
GO
INSERT [dbo].[WorkerObjects] ([WorkerObjectId], [Address], [WorkerCount]) VALUES (N'6c690bcf-50d9-48f8-b0d9-123fe9610d21', N'ул. Пушкина, дом Колотушкина', 2)
GO
INSERT [dbo].[WorkerObjects] ([WorkerObjectId], [Address], [WorkerCount]) VALUES (N'4a79b641-dafa-4212-8e90-ee42321db6a5', N'ул. Кремлёвая, д.1', 3)
GO
INSERT [dbo].[Shifts] ([ShiftId], [ShiftDate], [WorkerObject_WorkerObjectId]) VALUES (N'b6bb6dc2-959b-42d6-b4d6-1936882d8b00', CAST(0x0000A72E00000000 AS DateTime), N'4a79b641-dafa-4212-8e90-ee42321db6a5')
GO
INSERT [dbo].[Shifts] ([ShiftId], [ShiftDate], [WorkerObject_WorkerObjectId]) VALUES (N'd1d0e4f0-b89d-41ae-8f30-54c8342ec77a', CAST(0x0000A72F00000000 AS DateTime), N'6c690bcf-50d9-48f8-b0d9-123fe9610d21')
GO
INSERT [dbo].[Shifts] ([ShiftId], [ShiftDate], [WorkerObject_WorkerObjectId]) VALUES (N'b76aaa9f-6679-4141-a900-d66831342ff3', CAST(0x0000A72F00000000 AS DateTime), N'4a79b641-dafa-4212-8e90-ee42321db6a5')
GO
INSERT [dbo].[Shifts] ([ShiftId], [ShiftDate], [WorkerObject_WorkerObjectId]) VALUES (N'7e1654d5-0bf6-4b32-9e36-fc15cb27dc58', CAST(0x0000A72E00000000 AS DateTime), N'6c690bcf-50d9-48f8-b0d9-123fe9610d21')
GO
INSERT [dbo].[Workers] ([WorkerId], [WorkerName], [Cost], [Specialty]) VALUES (N'26572fe8-6b67-48fb-b28d-3729b2573aee', N'Сидор Сидоров', 70000, N'Зарубежное регионоведение')
GO
INSERT [dbo].[Workers] ([WorkerId], [WorkerName], [Cost], [Specialty]) VALUES (N'8f094736-9c8a-4257-9946-5d5057f97bc3', N'Петр Петров', 60000, N'Авиастроение')
GO
INSERT [dbo].[Workers] ([WorkerId], [WorkerName], [Cost], [Specialty]) VALUES (N'5fe9e548-bc06-42cc-848b-db764ff46c9d', N'Иван Иванов', 50000, N'История искусств')
GO
INSERT [dbo].[WorkerShifts] ([Worker_WorkerId], [Shift_ShiftId]) VALUES (N'8f094736-9c8a-4257-9946-5d5057f97bc3', N'b6bb6dc2-959b-42d6-b4d6-1936882d8b00')
GO
INSERT [dbo].[WorkerShifts] ([Worker_WorkerId], [Shift_ShiftId]) VALUES (N'8f094736-9c8a-4257-9946-5d5057f97bc3', N'd1d0e4f0-b89d-41ae-8f30-54c8342ec77a')
GO
INSERT [dbo].[WorkerShifts] ([Worker_WorkerId], [Shift_ShiftId]) VALUES (N'5fe9e548-bc06-42cc-848b-db764ff46c9d', N'd1d0e4f0-b89d-41ae-8f30-54c8342ec77a')
GO
INSERT [dbo].[WorkerShifts] ([Worker_WorkerId], [Shift_ShiftId]) VALUES (N'26572fe8-6b67-48fb-b28d-3729b2573aee', N'b76aaa9f-6679-4141-a900-d66831342ff3')
GO
INSERT [dbo].[WorkerShifts] ([Worker_WorkerId], [Shift_ShiftId]) VALUES (N'26572fe8-6b67-48fb-b28d-3729b2573aee', N'7e1654d5-0bf6-4b32-9e36-fc15cb27dc58')
GO
INSERT [dbo].[WorkerShifts] ([Worker_WorkerId], [Shift_ShiftId]) VALUES (N'5fe9e548-bc06-42cc-848b-db764ff46c9d', N'7e1654d5-0bf6-4b32-9e36-fc15cb27dc58')
GO
