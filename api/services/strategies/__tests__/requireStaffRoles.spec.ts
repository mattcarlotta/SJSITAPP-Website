import { Response } from "express";
import mongoose from "mongoose";
import { connectToDB } from "~database";
import { User } from "~models";
import { requireStaffRole } from "~services/strategies";
import { accessDenied, badCredentials } from "~messages/errors";
import { mockResponse, mockRequest } from "~test/utils/mockExpress";

const next = jest.fn();

describe("Require Staff Authentication Middleware", () => {
  let res: Response;
  beforeEach(() => {
    res = mockResponse();
  });

  beforeAll(async () => {
    await connectToDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("handles invalid requests requiring staff privileges", async done => {
    const req = mockRequest();

    await requireStaffRole(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ err: accessDenied });
    done();
  });

  it("handles suspended staff authenticated sessions", async done => {
    const existingUser = await User.findOne({
      email: "suspended.employee@example.com"
    });

    const session = {
      user: {
        id: existingUser!._id,
        role: "staff"
      }
    };

    const req = mockRequest(session);

    await requireStaffRole(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ err: badCredentials });
    done();
  });

  it("handles deleted/non-existent staff authenticated sessions", async done => {
    const session = {
      user: {
        id: "5d5b5e952871780ef474807d",
        role: "staff"
      }
    };

    const req = mockRequest(session);

    await requireStaffRole(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ err: badCredentials });
    done();
  });

  it("handles valid requests requiring staff privileges", async done => {
    const existingUser = await User.findOne({
      email: "carlotta.matt@gmail.com"
    });

    const session = {
      user: {
        id: existingUser!._id,
        role: existingUser!.role
      }
    };

    const req = mockRequest(session);

    await requireStaffRole(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    done();
  });
});
